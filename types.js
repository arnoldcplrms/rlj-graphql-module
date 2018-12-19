const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList
} = graphql;

const { Accounts } = require('./src/models/Accounts')

const SeenType = new GraphQLObjectType({
    name: 'Seen',
    fields: () => ({
        HasSeen: { type: GraphQLBoolean },
        By: {
            type: AccountType,
            resolve(parent, args) {
                return Accounts.findById(parent.By)
            }
        },
        TimeStamp: { type: GraphQLString }
    })
})

const ActivitiesType = new GraphQLObjectType({
    name: 'Activities',
    fields: () => ({
        _id: { type: GraphQLString },
        Activity: { type: GraphQLString },
        IsMobile: { type: GraphQLBoolean },
        MacAddress: { type: GraphQLString },
        TimeStamp: { type: GraphQLString },
        Seen: { type: SeenType },
        ActivityBy: {
            type: AccountType,
            resolve(parent, args) {
                return Accounts.findById(parent.AccountId)
            }
        }
    })
})

const AccountType = new GraphQLObjectType({
    name: 'Account',
    fields: () => ({
        _id: { type: GraphQLID },
        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        MiddleName: { type: GraphQLString },
        BirthDate: { type: GraphQLString },
        Email: { type: GraphQLString },
        // Address: {
        //     Country: { type: GraphQLString },
        //     Street: { type: GraphQLString },
        //     Town: { type: GraphQLString },
        //     City: { type: GraphQLString }
        // },
        MonitoredAccounts: {
            type: new GraphQLList(AccountType),
            resolve(parent, args) {
                let accounts = [];
                parent.MonitoredAccounts.forEach(element => {
                    let value = Accounts.findById(element);
                    accounts.push(value)
                });

                return accounts;
            }
        }
    })
})

module.exports = {
    AccountType,
    ActivitiesType
}