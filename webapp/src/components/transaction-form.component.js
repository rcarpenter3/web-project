import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { GET_TRANSACTIONS } from './transaction-list.component.js'
import { css } from '@emotion/core'

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
export default function TransactionForm (props) {
  TransactionForm.propTypes = {
    transaction: PropTypes.object,
    setIsAdding: PropTypes.func
  }
  const { setIsAdding } = props
  const [transaction, setTransaction] = useState(props && props.transaction ? props.transaction : {})
  const formRef = useRef(null)

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

  function saveButton () {
    return (
      <Mutation
        mutation={ADD_TRANSACTION}
        variables={transaction}
      >
        {addTransaction => (
          <button
            onClick={() => {
              addTransaction({
                variables: transaction,
                refetchQueries: [{ query: GET_TRANSACTIONS }]
              })
              setIsAdding(false)
            }}
            type='submit'>
              Save
          </button>
        )}
      </Mutation>
    )
  }

  function clearForm (ref) {
    ref.current && ref.current.reset()
  }

  return (
    <div css={form}>
      <form onSubmit={clearForm(formRef)} ref={formRef}>
        <label>{' Date: '}</label>
        <input name='date' onChange={handleChange} type='date' value={transaction.date} />
        <label> {'Merchant: '}</label>
        <input name='merchant_name' onChange={handleChange} type='text' value={transaction.merchant_name} />
        <label>{'Amount: '}</label>
        <input name='amount' onChange={handleChange} step='01.00' type='number' value={transaction.amount} />
        <label>{'Category: '}</label>
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
        <label>{'Transaction Type: '}</label>
        <select name='type' onBlur={handleTypeChange} value={''}>
          <option value=''>Select transaction type</option>
          <option value='debit'>Debit</option>
          <option value='credit'>Credit</option>
        </select>
      </form>
      <div css={actions}>
        {saveButton()}
        <button onClick={() => setIsAdding(false)}>Cancel</button>
      </div>
    </div>
  )
}

const form = css`
  background: #7D98A1;
  border-radius: 5px;
  margin: 24px auto 0 auto;
  padding: 4px 8px;
  input, select {
    width: 100%;
    padding: 8px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 8px;
  }
  label {
    margin-bottom: 2px;
  }
`

const actions = css`
  display: flex;
  justify-content: flex-end;
  button {
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 12px;
    padding: 4px;
    width: 100px;
    margin: 10px;
    &:hover {
      color: #1C2321;
      background-color: #A9B4C2;
      border: 1px solid #A9B4C2;
    }
  }
`
