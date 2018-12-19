const bcrypt = require('bcrypt'),
    saltRounds = 10,
    mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    MiddleName: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    BirthDate: {
        type: Date,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    ProfileImage: {
        type: String,
        default: null
    },
    ContactNumber: {
        type: String,
        required: true
    },
    Address: {
        Country: {
            type: String,
            required: true
        },
        Street: {
            type: String,
            required: true
        },
        Town: {
            type: String,
            required: true
        },
        City: {
            type: String,
            required: true
        }
    },
    MonitoredAccounts: {
        type: Array,
        default: []
    }
}, {
    collection: 'Accounts',
    versionKey: false
})

const Accounts = mongoose.model('Accounts', accountSchema);

exports.hashPassword = async(data) => {
    let salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(data, salt);
}

exports.comparePassword = async(password, encryptedString) => {
    return await bcrypt.compare(password, encryptedString);
}

exports.isUserNameExists = async(req) => {
    let result;
    const accounts = await Accounts.findOne({
        UserName: req.body.UserName
    }).exec();
    accounts ? result = true : result = false;

    return result
}

exports.isEmailExists = async(req) => {
    let result = true;
    const accounts = await Accounts.findOne({
        Email: req.body.Email
    }).exec();

    accounts ? result = true : result = false;

    return result
}

exports.Accounts = Accounts;