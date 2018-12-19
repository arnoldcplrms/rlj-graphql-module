const mongoose = require('mongoose');
const activityDetails = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ActivityId: String,
    SeenBy: {
        AccountId: String,
        TimeStamp: String
    },
    Explanation: String
    // Seen: {
    //     type: Boolean,
    //     default: false
    // }
}, {
        collection: 'ActivityDetails',
        versionKey: false
    })

module.exports = mongoose.model('ActivityDetails', activityDetails);