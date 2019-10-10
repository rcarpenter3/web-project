import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Transaction } from './transaction.component.js'
import { css } from '@emotion/core'

export const GET_TRANSACTIONS = gql`
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
  const [transactions, setTransactions] = useState([])
  const [isEditingTransaction, setIsEditingTransaction] = useState(false)
  console.log(isEditingTransaction)

  return (
    <div>
      <table css={table}>
        <thead css={[left, header]}>
          <tr>
            <th>Date</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Category</th>
            <th css={giveWidth}>{isEditingTransaction ? 'Transaction Type' : ''}</th>
            <th css={giveWidth} />
          </tr>
        </thead>
        <tbody>
          <Query query={GET_TRANSACTIONS} refetchQueries={GET_TRANSACTIONS}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...'
              if (error) return `Error! ${error.message}`
              setTransactions(data.transactions)
              return (
                transactions.map(transaction => {
                  return (
                    <Transaction
                      key={transaction.id}
                      setIsEditingTransaction={setIsEditingTransaction}
                      transaction={transaction}
                    />
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

const left = css`
  text-align: left;
`

const header = css`
  border-bottom: solid 1px #1C2321;
`

const table = css`
  margin: 20px auto;
  width: 100%;
  border-collapse: collapse;
    tr:nth-of-type(even) {
      background-color: #EEF1EF;
    }
    tr {
      line-height: 32px;
    }
`

const giveWidth = css`
  width: 20%;
`
