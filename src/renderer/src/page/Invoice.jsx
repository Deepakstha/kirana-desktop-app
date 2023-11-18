import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import InvoiceTable from '../components/Invoice/InvoiceTable'
import { useEffect, useState } from 'react'
import TableSearch from '../components/Search/TableSearch'

const Invoice = () => {
  const [results, setResults] = useState([])
  const [searchInvoiceId, setSearchInvoiceId] = useState('')
  let result
  const deepak = async () => {
    result = await window.electronic.invoke('displayAllInvoice', 'displayInvoice')
    setResults(result)
  }
  useEffect(() => {
    deepak()
  }, [result])

  const searchFunc = async () => {
    result = await window.electronic.invoke('searchInvoice', `%${searchInvoiceId}%`)
    setResults(result)
  }
  useEffect(() => {
    if (searchInvoiceId?.length > 0) {
      searchFunc()
    } else {
      deepak()
    }
  }, [searchInvoiceId])
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
              Invoice
            </Typography>
            <Link to="/add-invoice">
              <Button>
                {' '}
                <AddIcon />
                Add New Invoice
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <TableSearch
        setSearchValue={setSearchInvoiceId}
        searchValue={searchInvoiceId}
        placeholder="Invoice Id"
      />
      <InvoiceTable results={results} />
    </>
  )
}

export default Invoice
