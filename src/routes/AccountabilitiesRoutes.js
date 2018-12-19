const { AddAccountability, RemoveAccountabilty } = require('../controllers/AccountabilitiesController'),
    router = require('express').Router(),
    verifyAuth = require('../middlewares/jwt_verify_auth')


router.put('/',
    verifyAuth,
    AddAccountability)


// TODO: add the functionality of remove accountability
.delete('/:id',
    verifyAuth,
    RemoveAccountabilty)


module.exports = router