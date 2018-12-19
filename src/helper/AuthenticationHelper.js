const jwt = require('jsonwebtoken'),
    secretKey = "!@#$%^&*()"

module.exports = {
    async Sign(payload) {
        return await jwt.sign(payload, secretKey);
    },
    VerifyAuth(req, res, next) {
        const token = req.header("x-auth-token")
        if (!token) return res.status(401).send("Access denied. No token provided")
        try {
            req.user = jwt.verify(token, secretKey);
            next();
        } catch (error) {
            res.status(400).send('Invalid token.');
            console.log(error);
        }
    }
}