import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Tooltip, BarChart, Bar, ReferenceLine, XAxis, YAxis, Legend, CartesianGrid } from 'recharts'
import { css } from '@emotion/core'

export function SpendSummary (props) {
  SpendSummary.propTypes = {
    transactions: PropTypes.array
  }
  const { transactions } = props
  const categories = transactions && byCategory()
  const daily = transactions && byDay()
  const [chartType, setChartType] = useState('categories')

  function byCategory () {
    let categoriesArray = []
    transactions && transactions.map(t => {
      const realAmount = t.transaction_type === 'debit' ? t.amount : -Math.abs(t.amount)
      categoriesArray.push({ key: t.description, spend: realAmount, transaction_type: t.transaction_type })
    })

    let arr = []
    const totalledCategories = categoriesArray.reduce((acc, o) => {
      const match = acc.find(a => a.key === o.key)
      if (match) {
        match.spend = o.spend + match.spend
      } else {
        arr.push({ key: o.key, spend: o.spend })
      }
      return arr
    }, [])
    return totalledCategories
  }

  function byDay () {
    let dailyArray = []
    transactions && transactions.map(t => {
      const realAmount = t.transaction_type === 'debit' ? t.amount : -Math.abs(t.amount)
      dailyArray.push({ key: t.date, spend: realAmount, transaction_type: t.transaction_type })
    })

    let arr = []
    const totalByDay = dailyArray.reduce((acc, o) => {
      const match = acc.find(a => a.key === o.key)

      if (match) {
        match.spend = o.spend + match.spend
      } else {
        arr.push({ key: o.key, spend: o.spend })
      }
      return arr
    }, [])
    return totalByDay
  }

  function barChart (type) {
    return (
      <BarChart css={barChartStyle} data={type} height={400} width={800}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='key' />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine stroke='#000' y={0} />
        <Bar dataKey='spend' fill='#7D98A1' />
      </BarChart>
    )
  }

  return (
    <>
      <h1>Spend Summary - {chartType.toUpperCase()}</h1>
      {barChart(chartType === 'categories' ? categories : daily) }
      {chartType === 'categories' && <button css={buttonStyle} onClick={() => setChartType('daily')}>See daily spend summary</button>}
      {chartType === 'daily' && <button css={buttonStyle} onClick={() => setChartType('categories')}>See spend by category</button>}
    </>
  )
}

const barChartStyle = css`
  margin: 5px 10px 20px 5px;
`

const buttonStyle = css`
  background-color: #5E6572;
  color: #EEF1EF;
  border-radius: 5px;
  font-size: 16px;
  height: 32px;
  &:hover {
    color: #1C2321;
    background-color: #A9B4C2;
  }
`
