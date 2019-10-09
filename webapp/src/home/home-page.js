import React from 'react'
import { SpendSummary } from '../components/spend-summary.component.js'
import TransactionForm from '../components/transaction-form.component.js'
import { TransactionList } from '../components/transaction-list.component.js'

export function Home () {
  return (
    <div>
      <h1>Spend Summary</h1>
      <SpendSummary />
      <h1>Manage Transactions</h1>
      <TransactionForm />
      <TransactionList />
    </div>
  )
}
