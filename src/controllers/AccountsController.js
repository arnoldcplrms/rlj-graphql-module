const jwt = require("jsonwebtoken"),
    { JWT_SECRET } = require('../config/config'),
    errorHandler = require('../helper/ErrorHandler'),
    AccountsDAL = require('../data_access/AccountsDataAccess'),

    loginHandler = async(data, res) => {
        let token = await jwt.sign({
            _id: data._id,
            userName: data.userName,
            email: data.email
        }, JWT_SECRET, {
            expiresIn: "7d"
        });

        res.send(token);
    }
module.exports = {
    async AddAccount(req, res) {
        try {
            await AccountsDAL.RegisterAccount(req);
            res.send({
                message: `Inserted succesfully`
            });
        } catch (error) {
            errorHandler(error, res);
        }
    },
    async RetrieveAccount(req, res) {
        try {
            const result = await AccountsDAL.RetrieveAccount(req);
            res.send(result);
        } catch (error) {
            errorHandler(error, res);
        }
    },
    async Login(req, res) {
        try {
            const login = await AccountsDAL.IsLoginAuthorized(req)
            login.isAuthorized ?
                await loginHandler(login, res) :
                res.status(401).send({
                    message: 'Invalid username or password.'
                });
        } catch (error) {
            errorHandler(error, res);
        }
    }
}