import React, { useEffect, useState } from 'react'
import CustomerTable from '../components/Customer/CustomerTable'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import TableSearch from '../components/Search/TableSearch'

const Customer = () => {
  const [results, setResults] = useState([])
  const [searchValue, setSearchValue] = useState('')
  let result
  const deepak = async () => {
    result = await window.electronic.invoke('displayCustomer', 'Customer Clicked')
    console.log(result)
    setResults(result)
  }
  useEffect(() => {
    deepak()
  }, [result])

  const searchFunc = async () => {
    result = await window.electronic.invoke('searchCustomer', `%${searchValue}%`)
    console.log(result)
    setResults(result)
  }
  useEffect(() => {
    if (searchValue?.length > 0) {
      searchFunc()
    } else {
      deepak()
    }
  }, [searchValue])
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: `240px` },
          backgroundColor: 'white',
          color: 'black'
        }}
      >
        <Toolbar>
          <IconButton aria-label="open drawer" edge="start" sx={{ mr: 2, display: { sm: 'none' } }}>
            {/* <MenuIcon /> */}
          </IconButton>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="h6" noWrap component="div">
              Customer
            </Typography>
            <Link to="/add-customer">
              <Button>
                {' '}
                <AddIcon />
                Add New Customer
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <TableSearch setSearchValue={setSearchValue} searchValue={searchValue} />
      <CustomerTable results={results} />
    </>
  )
}

export default Customer
