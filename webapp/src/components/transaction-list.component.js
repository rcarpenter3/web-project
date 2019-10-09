import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Transaction } from './transaction.component.js'

const GET_TRANSACTIONS = gql`
  query GetTransactions{
    transactions {
      id
      user_id
      credit
      debit
      description
      merchant_name
      date
      amount
    }
  }
`

export function TransactionList () {
  return (
    <div>
      <h2>Transaction List</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <Query query={GET_TRANSACTIONS}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...'
              if (error) return `Error! ${error.message}`
              return (
                data.transactions.map(transaction => {
                  return (
                    <Transaction key={transaction.id} transaction={transaction} />
                  )
                })
              )
            }}
          </Query>
        </tbody>
      </table>
    </div>
  )
}
