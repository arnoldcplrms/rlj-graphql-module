const verifyAuth = require('../middlewares/jwt_verify_auth'),
    accountsValidation = require('../middlewares/AccountsValidation'),
    accountsController = require('../controllers/AccountsController'),
    router = require('express').Router()


router.post('/',
    accountsValidation,
    accountsController.AddAccount)

.post('/login',
    accountsController.Login)

.get('/:id',
    verifyAuth,
    accountsController.RetrieveAccount)

module.exports = router;