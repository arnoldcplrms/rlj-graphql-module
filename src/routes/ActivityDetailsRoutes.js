const verifyAuth = require('../middlewares/jwt_verify_auth'),
    ActivityDetailsController = require('../controllers/ActivityDetailsController'),
    router = require('express').Router()

router.put('/seen',
    verifyAuth,
    ActivityDetailsController.SetAsSeen)

.put('/explain',
    verifyAuth,
    ActivityDetailsController.AddExplanation)

module.exports = router