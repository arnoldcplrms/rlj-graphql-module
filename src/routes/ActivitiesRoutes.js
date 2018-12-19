const verifyAuth = require('../middlewares/jwt_verify_auth'),
    ActivitiesController = require('../controllers/ActivitiesController'),
    router = require('express').Router();

router.get('/:id',
    verifyAuth,
    ActivitiesController.GetActivityLogsById)

.post('/',
    verifyAuth,
    ActivitiesController.LogActivity)

.put('/',
    verifyAuth,
    ActivitiesController.AddExplanation)

.put('/seen',
    verifyAuth,
    ActivitiesController.SetAsSeen)

.delete('/',
    verifyAuth,
    ActivitiesController.DeleteActivity)

.get('/:id/count',
    verifyAuth,
    ActivitiesController.GetMonitoredAccountsActivityCount)


module.exports = router;