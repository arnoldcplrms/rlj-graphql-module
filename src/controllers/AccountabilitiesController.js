const AccountabilitiesDAL = require('../data_access/AccountabilitiesDataAccess'),
    errorHandler = require('../helper/ErrorHandler')

module.exports = {
    async AddAccountability(req, res) {
        try {
            await AccountabilitiesDAL.AddAccountability(req);
            res.send({
                message: 'Accountabilities added.'
            })
        } catch (error) {
            errorHandler(error, res);
        }
    },
    async RemoveAccountabilty() {

    }
}