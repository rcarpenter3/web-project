const graphql = require('graphql')
const TransactionType = require('./transaction-type')
const Transactions = require('../query-resolvers/transaction-resolvers.js')

const {
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} = graphql
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    transaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.findOne(args.id)
      }
    },
    transactions: {
      type: GraphQLList(TransactionType),
      args: {
        amount: { type: GraphQLFloat },
        transaction_type: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_name: { type: GraphQLString },
        user_id: { type: GraphQLString },
        date: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.find(args)
      }
    }
  })
})

module.exports = RootQuery
