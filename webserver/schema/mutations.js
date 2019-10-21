const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_name: { type: GraphQLString },
        transaction_type: { type: GraphQLString },
        amount: { type: GraphQLFloat },
        date: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_name, transaction_type, amount, date }) {
        return (new TransactionModel({ user_id, description, merchant_name, transaction_type, amount, date })).save()
      }
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, args) {
        return TransactionModel.findByIdAndDelete(args.id).exec()
      }
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_name: { type: GraphQLString },
        transaction_type: { type: GraphQLString },
        amount: { type: GraphQLFloat },
        date: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, args) {
        return TransactionModel.findByIdAndUpdate(args.id, {
          description: args.description,
          merchant_name: args.merchant_name,
          amount: args.amount,
          transaction_type: args.transaction_type,
          date: args.date
        })
      }
    }
  }
})

module.exports = mutation
