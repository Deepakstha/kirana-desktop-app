import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

const Sales = () => {
  const [pdata, setPdata] = useState([])
  const [highProductData, setHighProductData] = useState([])
  let result
  let productData
  const fetch = async () => {
    result = await window.electronic.invoke('totalSalesOfMonths', 'totalSales')
    setPdata(result)

    productData = await window.electronic.invoke('highestSoldProduct', 'highestSoldProduct')
    setHighProductData(productData)
  }
  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <Box>
        <Typography sx={{ textAlign: 'center' }}>Sales of the months</Typography>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={pdata.slice(-12)}>
            <CartesianGrid strokeDasharray="3 3 " />
            <XAxis dataKey="sale_month" interval={'preserveEnd'} />
            <YAxis />
            <Tooltip />
            <Line dataKey="total_sales" activeDot={{ r: 11 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Box>
        <Typography sx={{ textAlign: 'center' }}>Highest Sold Category</Typography>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={highProductData.slice(-10)}>
            <CartesianGrid strokeDasharray="3 3 " />
            <XAxis dataKey="product_category" interval={'preserveEnd'} />
            <YAxis />
            <Tooltip />
            <Line dataKey="total_sold" activeDot={{ r: 11 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </>
  )
}

export default Sales
