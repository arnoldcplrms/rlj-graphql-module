const { Accounts, comparePassword, hashPassword } = require('../models/Accounts'),
    mongoose = require('mongoose')
module.exports = {
    async RegisterAccount(req) {
        req.body.Password = await hashPassword(req.body.Password);
        const body = req.body;
        await new Accounts({
            _id: new mongoose.Types.ObjectId(),
            FirstName: body.FirstName,
            LastName: body.LastName,
            MiddleName: body.MiddleName,
            UserName: body.UserName,
            Password: body.Password,
            BirthDate: new Date(body.BirthDate).toDateString(),
            Email: body.Email,
            ContactNumber: body.ContactNumber,
            Address: {
                Country: body.Address.Country,
                Street: body.Address.Street,
                Town: body.Address.Town,
                City: body.Address.City
            }
        }).save();
    },
    async RetrieveAccount(req) {
        return await Accounts.findOne({
            "_id": mongoose.Types.ObjectId(req.params.id)
        }).exec();
    },
    async IsLoginAuthorized(req) {
        let res;
        let dataObject = {};
        let data = req.body;
        const account = await Accounts.findOne({
            UserName: data.UserName
        }).exec();

        (account &&
            await comparePassword(data.Password, account.Password)) ?
            res = true : res = false;

        res ? dataObject = {
            isAuthorized: res,
            _id: account._id,
            userName: account.UserName,
            email: account.Email
        } : dataObject = {
            isAuthorized: res
        }

        return dataObject;
    }
}