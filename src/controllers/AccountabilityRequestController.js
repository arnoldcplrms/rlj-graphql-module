const AcctblRequest = require('../data_access/AccountabilityRequestDataAccess'),
    errorHandler = require('../helper/ErrorHandler')

module.exports = {
    async NewAccountabilityRequest(req, res) {
        try {
            const existingRecord = await AcctblRequest.FindExistingRequest(req)
            if (existingRecord === 0) {
                await AcctblRequest.NewAccountabilityRequest(req);
                res.send({
                    message: 'Request sent sucessfully.'
                });
            } else {
                res.status(400).send({
                    message: 'You have an existing request with this account.'
                });
            }
        } catch (error) {
            errorHandler(error, res);
        }
    },

    async RetrieveRequest(req, res) {
        try {
            const result = await AcctblRequest.RetrieveRequest(req);
            res.send(result);
        } catch (error) {
            errorHandler(error, res);
        }
    },

    async DeleteRequest(req, res) {
        try {
            await AcctblRequest.DeleteRequest(req);
            res.send({
                message: "Request deleted sucessfully."
            })
        } catch (error) {
            errorHandler(error, res)
        }
    }
}