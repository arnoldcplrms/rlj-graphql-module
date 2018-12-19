module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/rlj_Db',
    PORT: process.env.PORT || 3000,
    EXPIRATION_DAYS: parseInt(process.env.EXPIRATION_DAYS) || 2,
    JWT_SECRET: process.env.JWT_SECRET || "!@#$%^&*()"
}