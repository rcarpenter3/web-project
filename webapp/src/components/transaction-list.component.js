import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Transaction } from './transaction.component.js'
import { css } from '@emotion/core'

export function TransactionList (props) {
  TransactionList.propTypes = {
    transactions: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.func,
    getTransactions: PropTypes.object
  }
  const { loading, error, transactions, getTransactions } = props
  const [isEditingTransaction, setIsEditingTransaction] = useState(false)

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
          { loading && <tr><td>Loading...</td></tr> }
          { error && <tr><td>`Error! ${error.message}`</td></tr> }
          { transactions && transactions.map(transaction => {
            return (
              <Transaction
                getTransactions={getTransactions}
                key={transaction.id}
                setIsEditingTransaction={setIsEditingTransaction}
                transaction={transaction}
              />
            )
          })}
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
