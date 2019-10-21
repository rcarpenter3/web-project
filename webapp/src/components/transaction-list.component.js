import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Transaction } from './transaction.component.js'
import { css } from '@emotion/core'
import _ from 'lodash'

export function TransactionList (props) {
  TransactionList.propTypes = {
    transactions: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.func,
    getTransactions: PropTypes.object
  }
  const { loading, error, transactions, getTransactions } = props
  const [isEditingTransaction, setIsEditingTransaction] = useState(false)
  const [orderedTransactions, setOrderedTransactions] = useState([])
  const [ascending, setAscending] = useState(true)
  useOrderedTransactions()

  function useOrderedTransactions () {
    useEffect(() => {
      const ordered = _.sortBy(transactions, ['date', 'description'])
      setOrderedTransactions(ordered)
    }, [transactions])
  }

  return (
    <div>
      <table css={table}>
        <thead css={[left, header]}>
          <tr>
            <th onClick={() => sortList('date')}>Date</th>
            <th onClick={() => sortList('merchant_name')}>Merchant</th>
            <th onClick={() => sortList('amount')}>Amount</th>
            <th onClick={() => sortList('description')}>Category</th>
            <th css={giveWidth}>{isEditingTransaction ? 'Transaction Type' : ''}</th>
            <th css={giveWidth} />
          </tr>
        </thead>
        <tbody>
          { loading && <tr><td>Loading...</td></tr> }
          { error && <tr><td>`Error! ${error.message}`</td></tr> }
          { orderedTransactions && orderedTransactions.map(transaction => {
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
  function sortList (sortBy) {
    ascending ? setOrderedTransactions(_.sortBy(transactions, [sortBy, 'description'])) : setOrderedTransactions(_.sortBy(transactions, [sortBy, 'description']).reverse())
    setAscending(prevState => !prevState)
  }
}

const left = css`
  text-align: left;
`

const header = css`
  border-bottom: solid 1px #1C2321;
  th:hover {
    cursor: pointer;
    text-decoration: underline;
  }
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
