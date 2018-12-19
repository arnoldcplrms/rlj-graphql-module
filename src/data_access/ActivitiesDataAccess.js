const Activities = require('../models/Activities'),
    { Accounts } = require('../models/Accounts'),
    timeStamp = require('../helper/timestamp'),
    mongoose = require('mongoose')

module.exports = {
    async GetActivityLogsById(req) {
        return await Activities.find({
            "AccountId": req.params.id
        }).exec();
    },

    async LogActivity(req) {
        const body = req.body;
        await new Activities({
            _id: new mongoose.Types.ObjectId(),
            AccountId: mongoose.Types.ObjectId(body.AccountId),
            Activity: body.Activity,
            IsMobile: body.IsMobile,
            MacAddress: body.MacAddress,
            TimeStamp: timeStamp()
        }).save();
    },

    async DeleteActivity(req) {
        await Activities.deleteOne({
            "_id": new mongoose.Types.ObjectId(req.body.id)
        }).exec();
    },

    async AddExplanation(req) {
        await Activities.update(
            { "_id": new mongoose.Types.ObjectId(req.id) },
            {
                $push: {
                    Explanation: req
                }
            }
        ).exec();
    },

    //updates the activity as seen by the accountable
    async SetAsSeen(req) {
        const body = req.body;
        await Activities.update(
            { "_id": new mongoose.Types.ObjectId(body.id) },
            {
                $set: {
                    Seen: {
                        HasSeen: true,
                        By: body.AccountId,
                        TimeStamp: timeStamp()
                    }
                }
            }
        ).exec();
    },

    //gets the total suspicious activity 
    //detected from the monitored accounts
    async GetTotalActivityCount(req) {
        const result = [];
        const account = await Accounts.findOne({
            _id: mongoose.Types.ObjectId(req.params.id)
        }).exec();
        const monAccs = account.MonitoredAccounts;

        for (let i = 0, len = monAccs.length; i < len; i++) {
            const profile = await Accounts.aggregate(
                [
                    {
                        $match: {
                            _id: mongoose.Types.ObjectId(monAccs[i])
                        }
                    },
                    {
                        $lookup: {
                            from: "Activities",
                            localField: "_id",
                            foreignField: "AccountId",
                            as: "activities"
                        }
                    },
                ]
            ).exec();

            result.unshift({
                FullName: `${profile[0].FirstName} ${profile[0].LastName}`,
                AccountId: monAccs[i],
                ActivityCount: profile[0].activities.length
            });
        }

        return result;
    }
}