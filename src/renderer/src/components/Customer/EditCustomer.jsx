import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const EditCustomer = () => {
  const [customerName, setCustomerName] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [customerContact, setCustomerContact] = useState('')

  let { cus_id } = useParams()

  let result
  const deepak = async () => {
    result = await window.electronic.invoke('editCustomer', cus_id)
    setCustomerName(result[0].customer_name)
    setCustomerAddress(result[0].customer_address)
    setCustomerContact(result[0].customer_contact)
    // setResults(result)
  }
  useEffect(() => {
    deepak()
  }, [result])

  const handelSubmit = async () => {
    let customerInfo = {
      customerName,
      customerAddress,
      customerContact
    }
    let result = await window.electronic.invoke('updateCustomer', customerInfo)

    if (result == 'Customer Updated') {
      Swal.fire({ text: result, icon: 'success', timer: 1500, width: 350 })
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
            <Link to="/customer" style={{ color: 'black' }}>
              <Typography sx={{ cursor: 'pointer' }}>
                {' '}
                <KeyboardBackspaceIcon />{' '}
              </Typography>
            </Link>
            <Typography variant="h6" noWrap component="div">
              Add New Customer
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Box>
        <Box>
          <Typography>Customer Name</Typography>
          <TextField value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </Box>
        <Box>
          <Typography>Customer Address</Typography>
          <TextField value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
        </Box>
        <Box>
          <Typography>Customer Contact</Typography>
          <TextField value={customerContact} onChange={(e) => setCustomerContact(e.target.value)} />
        </Box>
        <Button variant="contained" onClick={() => handelSubmit('123')}>
          Update
        </Button>
      </Box>
    </>
  )
}

export default EditCustomer
