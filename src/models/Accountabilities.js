const mongoose = require('mongoose');
const accountabilitiesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    AccountId: String,
    MonitoredAccounts: Array
}, {
    collection: 'Accountabilities',
    versionKey: false
})

module.exports = mongoose.model('Accountabilities', accountabilitiesSchema);