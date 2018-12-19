const graphql = require('graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString
} = graphql;

const { ActivitiesType } = require('./types.js')
const Activities = require('./src/models/Activities')
const { Types: { ObjectId } } = require('mongoose')


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getActivities: {
            type: new GraphQLList(ActivitiesType),
            args: { accountId: { type: GraphQLString } },
            resolve(parent, args) {
                return Activities.find({
                    AccountId: args.accountId
                })
            }
        }
    }
})

// const Mutation = new GraphQLObjectType({

// })

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: null
})