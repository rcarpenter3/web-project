import { css } from '@emotion/core'
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { SpendSummary } from '../components/spend-summary/spend-summary.component.js'
import TransactionForm from '../components/transaction-form.component.js'
import { Query } from 'react-apollo'
import { TransactionList } from '../components/transaction-list.component.js'

const GET_TRANSACTIONS = gql`
  query GetTransactions{
    transactions {
      id
      user_id
      transaction_type
      description
      merchant_name
      date
      amount
    }
  }
`

export function Home () {
  const [isAdding, setIsAdding] = useState(false)
  return (
    <div css={home}>
      <Query query={GET_TRANSACTIONS} refetchQueries={GET_TRANSACTIONS}>
        {({ data, loading, error }) => {
          return (
            <>
              <SpendSummary transactions={data.transactions} />
              <div css={flex}>
                <h1>Manage Transactions</h1>
                { !isAdding &&
                  <button css={buttonStyle} onClick={() => setIsAdding(true)}> + Add Transaction</button>
                }
              </div>
              { isAdding &&
                <TransactionForm getTransactions={GET_TRANSACTIONS} setIsAdding={setIsAdding} />
              }
              <hr />
              <TransactionList error={error} getTransactions={GET_TRANSACTIONS} loading={loading} transactions={data.transactions} />
            </>
          )
        }}
      </Query>
    </div>
  )
}

const buttonStyle = css`
  background-color: #5E6572;
  color: #EEF1EF;
  border-radius: 5px;
  font-size: 16px;
  margin-right: 12px;
  margin-top: 32px;
  height: 32px;
  &:hover {
    color: #1C2321;
    background-color: #A9B4C2;
  }
`

const flex = css`
  display: flex;
  justify-content: space-between;
`

const home = css`
  width: 90%;
  margin: auto;
  h1 {
    margin-bottom: 0;
  }
`
