const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat
} = graphql

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    description: { type: GraphQLString },
    merchant_name: { type: GraphQLString },
    transaction_type: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    date: { type: GraphQLString }
  })
})

module.exports = TransactionType
