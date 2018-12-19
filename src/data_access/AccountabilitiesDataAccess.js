const Accountabilities = require('../models/Accountabilities'),
    mongoose = require('mongoose')

module.exports = {
    async SetAccountabilityCollection(id) {
        await new Accountabilities({
            _id: new mongoose.Types.ObjectId(),
            AccountId: id,
            MonitoredAccounts: []
        })
    },
    async AddAccountability(req) {
        const data = req.body;
        await Accountabilites.update(
            { "_id": new mongoose.Types.ObjectId(data.id) },
            {
                $push: {
                    MonitoredAccounts: data.Id
                }
            }
        ).exec();
    }
}