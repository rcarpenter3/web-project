import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

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
const List = () => (
  <Query query={GET_TRANSACTIONS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`
      return (
        data.transactions.map(transaction => (
          <div key={transaction.id}>
            <p>{transaction.id}</p>
            <p>{transaction.amount}</p>
            <p>{transaction.merchant_name}</p>
          </div>
        ))
      )
    }}
  </Query>
)

export function TransactionList () {
  return (
    <div>
      <h2>Transaction List</h2>
      <List />
    </div>
  )
}
