const AccountabilityRequest = require('../models/AccountabilityRequest'),
    Accounts = require('../models/Accounts'),
    timeStamp = require('../helper/timestamp'),
    mongoose = require('mongoose')

module.exports = {
    async NewAccountabilityRequest(req) {
        const data = req.body;
        await new AccountabilityRequest({
            _id: new mongoose.Types.ObjectId(),
            AccountId: data.AccountId,
            RequestorId: data.RequestorId,
            RequestDate: timeStamp()
        }).save();
    },

    async FindExistingRequest(req) {
        const data = req.body;
        return await AccountabilityRequest.countDocuments({
            AccountId: data.AccountId,
            RequestorId: data.RequestorId
        }).exec();
    },

    async RetrieveRequest(req) {
        const result = [];
        const request = await AccountabilityRequest.find({
            AccountId: req.params.id
        }).exec();

        for (let i = 0, len = request.length; i < len; i++) {
            const accountResult = await Accounts.findOne({
                _id: mongoose.Types.ObjectId(request[i].RequestorId)
            }).exec();

            result.unshift({
                Object_Id: request[i]._id,
                FullName: `${accountResult.FirstName} ${accountResult.LastName}`,
                Email: accountResult.Email,
                ProfileImage: accountResult.ProfileImage,
                AccountId: accountResult._id,
                RequestDate: request[i].RequestDate
            });
        }
        return result;
    },

    async DeleteRequest(req) {
        await AccountabilityRequest.deleteOne({
            "_id": mongoose.Types.ObjectId(req.params.id)
        }).exec();
    }

}