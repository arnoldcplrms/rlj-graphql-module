const timeStamp = require('../helper/timestamp'),
    errorHandler = require('../helper/ErrorHandler'),
    ActivitiesDAL = require('../data_access/ActivitiesDataAccess')

module.exports = {
    async GetActivityLogsById(req, res) {
        try {
            const result = await ActivitiesDAL.GetActivityLogsById(req);
            res.send(result);
        } catch (error) {
            errorHandler(error, res)
        }
    },

    async LogActivity(req, res) {
        try {
            await ActivitiesDAL.LogActivity(req);
            res.send({
                message: `Inserted succesfully`
            })
        } catch (error) {
            errorHandler(error, res)
        }
    },

    async DeleteActivity(req, res) {
        try {
            await ActivitiesDAL.DeleteActivity(req);
            res.send({
                message: `Deleted succesfully`
            });
        } catch (error) {
            errorHandler(error, res)
        }
    },

    async AddExplanation(req, res) {
        try {
            const body = req.body;
            await ActivitiesDAL.AddExplanation({
                id: body.id,
                explanation: body.explanation,
                timeStamp: timeStamp()
            });

            res.send({
                message: "Explanation added Successfully"
            });
        } catch (error) {
            errorHandler(error, res);
        }
    },

    async SetAsSeen(req, res) {
        try {
            await ActivitiesDAL.SetAsSeen(req);
            res.send({
                message: "Updated to seen Successfully"
            });
        } catch (error) {
            errorHandler(error, res);
        }
    },

    async GetMonitoredAccountsActivityCount(req, res) {
        try {
            const result = await ActivitiesDAL.GetTotalActivityCount(req);
            res.send(result);
        } catch (error) {
            errorHandler(error, res);
        }
    }

}