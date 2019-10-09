import React, { useState } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const ADD_TRANSACTION = gql`
  mutation AddTransaction($amount: Float, $credit: Boolean, $debit: Boolean, $description: String, $merchant_name: String, $date: String) {
    addTransaction(amount: $amount, credit: $credit, debit: $debit, description: $description, merchant_name: $merchant_name, date: $date) {
      id
      amount
      credit
      debit
      description
      merchant_name
      date
    }
  }
`
const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: String, $amount: Float, $credit: Boolean, $debit: Boolean, $description: String, $merchant_name: String, $date: String) {
    updateTransaction(id: $id, amount: $amount, credit: $credit, debit: $debit, description: $description, merchant_name: $merchant_name, date: $date) {
      id
      amount
      credit
      debit
      description
      merchant_name
      date
    }
  }
`

export default function TransactionForm (props) {
  TransactionForm.propTypes = {
    isEditing: PropTypes.bool,
    setIsEditing: PropTypes.func,
    transaction: PropTypes.object
  }
  const { isEditing, setIsEditing } = props
  const [transaction, setTransaction] = useState(props && props.transaction ? props.transaction : {})

  function handleChange (event) {
    let value
    if (event.target.name === 'amount') {
      value = parseFloat(event.target.value)
    } else {
      value = event.target.value
    }
    setTransaction({ ...transaction, [event.target.name]: value })
  }

  function handleTypeChange (event) {
    if (event.target.value && event.target.value === 'debit') {
      setTransaction({ ...transaction, debit: true, credit: false })
    } else if (event.target.value && event.target.value === 'credit') {
      setTransaction({ ...transaction, credit: true, debit: false })
    } else {
      setTransaction({ ...transaction, credit: false, debit: false })
    }
  }

  function updateButton () {
    return (
      <Mutation mutation={UPDATE_TRANSACTION} variables={transaction}>
        {updateTransaction => (
          <button onClick={() => updateTransactionClick(updateTransaction)} type='submit'>Update</button>
        )}
      </Mutation>
    )
  }

  function updateTransactionClick (updateTransaction) {
    setIsEditing(false)
    updateTransaction()
  }

  function saveButton () {
    return (
      <Mutation mutation={ADD_TRANSACTION} variables={transaction}>
        {addTransaction => (
          <button onClick={addTransaction} type='submit'>Save</button>
        )}
      </Mutation>
    )
  }

  return (
    <div>
      <form>
        <label>
          Date
          <input name='date' onChange={handleChange} type='date' value={transaction.date} />
        </label>
        <label>
          Merchant
          <input name='merchant_name' onChange={handleChange} type='text' value={transaction.merchant_name} />
        </label>
        <label>
          Amount
          <input name='amount' onChange={handleChange} step='01.00' type='number' value={transaction.amount} />
        </label>
        <label>
          Category
          <select name='description' onBlur={handleChange} value={transaction.description}>
            <option value=''>Select a category</option>
            <option value='entertainment'>Entertainment</option>
            <option value='food'>Food</option>
            <option value='healthcare'>Healthcare</option>
            <option value='housing'>Housing</option>
            <option value='insurance'>Insurance</option>
            <option value='miscellaneous'>Miscellaneous</option>
            <option value='savings'>Savings</option>
            <option value='transportation'>Transportation</option>
            <option value='utilities'>Utilities</option>
          </select>
        </label>
        <label>
          <select name='type'onBlur={handleTypeChange} value={transaction.type}>
            <option value=''>Select transaction type</option>
            <option value='debit'>Debit</option>
            <option value='credit'>Credit</option>
          </select>
        </label>
      </form>
      {isEditing ? updateButton() : saveButton()}
    </div>
  )
}
