import { css } from '@emotion/core'
import React, { useState } from 'react'
import { SpendSummary } from '../components/spend-summary/spend-summary.component.js'
import TransactionForm from '../components/transaction-form.component.js'
import { TransactionList } from '../components/transaction-list.component.js'

export function Home () {
  const [isAdding, setIsAdding] = useState(false)
  return (
    <div css={home}>
      <h1>Spend Summary</h1>
      <SpendSummary />
      <div css={flex}>
        <h1>Manage Transactions</h1>
        { !isAdding &&
          <button css={buttonStyle} onClick={() => setIsAdding(true)}> + Add Transaction</button>
        }
      </div>
      { isAdding &&
        <TransactionForm setIsAdding={setIsAdding} />
      }
      <hr />
      <TransactionList />
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
