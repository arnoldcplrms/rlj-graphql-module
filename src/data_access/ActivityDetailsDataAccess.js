const ActivityDetails = require('../models/ActivityDetails'),
    timeStamp = require('../helper/timestamp'),
    mongoose = require('mongoose')

module.exports = {
    async AddExplanation(req) {
        const body = req.body;
        await ActivityDetails.update({ "_id": new mongoose.Types.ObjectId(body.id) }, {
            $set: {
                Explanation: {
                    Body: body.Explanation,
                    TimeStamp: timeStamp(),
                }
            }
        }).exec();
    },

    async SetAsSeen(req) {
        const body = req.body;
        await ActivityDetails.update({ "_id": new mongoose.Types.ObjectId(body.id) }, {
            $set: {
                SeenBy: {
                    AccountId: body.AccountId,
                    TimeStamp: timeStamp()
                }
            }
        }).exec();
    }
}