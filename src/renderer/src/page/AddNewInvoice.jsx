import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const AddNewInvoice = () => {
  const [customerName, setCustomerName] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [customerContact, setCustomerContact] = useState('')
  const navigate = useNavigate()

  const handelSubmit = async () => {
    let customerInfo = {
      customerName,
      customerAddress,
      customerContact
    }
    if (customerName == '') {
      return await Swal.fire({ text: 'Customer name is Empty', icon: 'error', width: 350 })
    }
    let result = await window.electronic.invoke('addInvoice', customerInfo)

    if (result) {
      navigate(`/add-sales/${result.id}`)
    }
  }
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
          <IconButton
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          ></IconButton>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Link to="/invoice" style={{ color: 'black' }}>
              <Typography sx={{ cursor: 'pointer' }}>
                {' '}
                <KeyboardBackspaceIcon />{' '}
              </Typography>
            </Link>
            <Typography variant="h6" noWrap component="div">
              Add New Invoice
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box>
        {/* <Box sx={{ display: 'flex' }}> */}
        <Box sx={{ mb: 2 }}>
          <Typography>Customer Name</Typography>
          <TextField
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            sx={{ width: 300 }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography>Customer Address</Typography>
          <TextField
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            sx={{ width: 300 }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography>Customer Contact</Typography>
          <TextField
            value={customerContact}
            onChange={(e) => setCustomerContact(e.target.value)}
            sx={{ width: 300 }}
          />
        </Box>
        {/* </Box> */}
        <Button variant="contained" onClick={handelSubmit}>
          Add invoice
        </Button>
      </Box>
    </>
  )
}

export default AddNewInvoice
