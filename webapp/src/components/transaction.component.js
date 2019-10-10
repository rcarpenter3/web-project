import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { GET_TRANSACTIONS } from './transaction-list.component.js'
import { FiTrash2, FiEdit3, FiX, FiSave } from 'react-icons/fi'
import { css } from '@emotion/core'
import moment from 'moment'

export function Transaction (props) {
  Transaction.propTypes = {
    transaction: PropTypes.object,
    setIsEditingTransaction: PropTypes.func
  }

  const DELETE_TRANSACTION = gql`
    mutation DeleteTransaction($id: String) {
      deleteTransaction(id: $id) {
        id
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
  const { setIsEditingTransaction } = props
  const [isEditing, setIsEditing] = useState(false)
  const [transaction, setTransaction] = useState(props.transaction)
  useUpdate()

  function useUpdate () {
    useEffect(() => {
      setIsEditingTransaction(isEditing)
    }, [isEditing])
  }

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

  function saveUpdateButton () {
    return (
      <Mutation key={transaction.id} mutation={UPDATE_TRANSACTION}>
        {updateTransaction => (
          <FiSave onClick={() => {
            setIsEditing(false)
            updateTransaction({
              variables: transaction,
              refetchQueries: [{ query: GET_TRANSACTIONS }]
            })
          }} type='submit' />
        )}
      </Mutation>
    )
  }

  function editForm () {
    return (
      <tr>
        <td><input name='date' onChange={handleChange} type='date' value={transaction.date} /></td>
        <td><input name='merchant_name' onChange={handleChange} type='text' value={transaction.merchant_name} /></td>
        <td><input min='00.00' name='amount' onChange={handleChange} step='00.01' type='number' value={transaction.amount} /></td>
        <td>
          <select name='description' onBlur={handleChange} onChange={handleChange} value={transaction.description}>
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
        </td>
        <td>
          <select name='type' onBlur={handleTypeChange} onChange={handleTypeChange} value={transaction.credit ? 'credit' : 'debit'}>
            <option value=''>Select transaction type</option>
            <option value='debit'>Debit</option>
            <option value='credit'>Credit</option>
          </select>
        </td>
        <td css={[flex, actionButtons]}>
          {saveUpdateButton()}
          <FiX onClick={() => setIsEditing(false)} />
        </td>
      </tr>
    )
  }

  return (
    <>
      {isEditing && editForm()}
      {!isEditing &&
        (
          <tr>
            <td>{moment(transaction.date).format('MM/DD/YYYY')}</td>
            <td>{transaction.merchant_name}</td>
            <td css={transaction.credit ? credit : debit}>${transaction.amount.toFixed(2)}</td>
            <td>{transaction.description.toUpperCase()}</td>
            <td />
            <td css={[flex, actionButtons]}>
              {updateButton(transaction)}
              {deleteButton(transaction.id)}
            </td>
          </tr>
        )
      }
    </>
  )

  function updateButton (transaction) {
    return (
      <FiEdit3 onClick={() => setIsEditing(true)} type='submit' />
    )
  }

  function deleteButton (id) {
    return (
      <Mutation mutation={DELETE_TRANSACTION} variables={{ id }}>
        {deleteTransaction => (
          <FiTrash2
            onClick={() =>
              deleteTransaction({
                variables: { id: transaction.id },
                refetchQueries: [{ query: GET_TRANSACTIONS }]
              })
            }
            type='submit'
          />
        )}
      </Mutation>
    )
  }
}

const actionButtons = css`
  margin-top: 8px;
`

const credit = css`
color: #2c6821;
`

const debit = css`
color: #5c1e08;
`

const flex = css`
  display: flex;
  justify-content: space-evenly;
`
