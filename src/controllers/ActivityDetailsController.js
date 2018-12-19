const errorHandler = require('../helper/ErrorHandler'),
    ActivityDetailsDAL = require('../data_access/ActivityDetailsDataAccess')

module.exports = {
    async AddExplanation(req, res) {
        try {
            await ActivityDetailsDAL.AddExplanation(req);
            res.send({
                message: `Explanation added succesfully`
            })
        } catch (error) {
            errorHandler(error, res)
        }
    },
    async SetAsSeen(req, res) {
        try {
            await ActivityDetailsDAL.SetAsSeen(req);
            res.send({
                message: `Updated to seen succesfully`
            })
        } catch (error) {
            errorHandler(error, res);
        }
    }
}