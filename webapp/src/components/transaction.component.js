import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TransactionForm from './transaction-form.component.js'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

export function Transaction (props) {
  Transaction.propTypes = {
    transaction: PropTypes.object
  }

  const DELETE_TRANSACTION = gql`
    mutation DeleteTransaction($id: String) {
      deleteTransaction(id: $id) {
        id
      }
    }
  `
  const { transaction } = props
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div>
      {/*
        if is editing, display form, otherwise display static data
      */}
      {isEditing &&
        <TransactionForm isEditing={isEditing} setIsEditing={setIsEditing} transaction={transaction} />
      }
      {!isEditing &&
        (
          <>
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.merchant_name}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.description}</td>
              <td>{transaction.id}</td>
              <td>
                {updateButton(transaction)}
                {deleteButton(transaction.id)}
              </td>
            </tr>
          </>
        )
      }
    </div>
  )

  function updateButton (transaction) {
    return (
      <button onClick={() => setIsEditing(true)} type='submit'>Edit</button>
    )
  }

  function deleteButton (id) {
    return (
      <Mutation mutation={DELETE_TRANSACTION} variables={{ id }}>
        {deleteTransaction => (
          <button onClick={deleteTransaction} type='submit'>Delete</button>
        )}
      </Mutation>
    )
  }
}
