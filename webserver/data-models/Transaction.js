const { model, Schema, SchemaTypes } = require('mongoose')

const TransactionSchema = new Schema({
  id: { type: SchemaTypes.ObjectId },
  user_id: { type: String, default: null },
  amount: { type: Number, default: null },
  transaction_type: { type: String, default: null },
  description: { type: String, default: null },
  merchant_name: { type: String, default: null },
  date: { type: String, default: null }
})

const TransactionModel = model('transaction', TransactionSchema)

module.exports = {
  TransactionModel,
  TransactionSchema,
  default: TransactionSchema
}
