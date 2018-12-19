const AcctblReqController = require('../controllers/AccountabilityRequestController'),
    router = require('express').Router(),
    verifyAuth = require('../middlewares/jwt_verify_auth')

router.post('/',
    verifyAuth,
    AcctblReqController.NewAccountabilityRequest)

.get('/:id',
    verifyAuth,
    AcctblReqController.RetrieveRequest)

.delete('/:id',
    verifyAuth,
    AcctblReqController.DeleteRequest)


module.exports = router