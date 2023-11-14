import { AppBar, Box, Button, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const AddNewSupplyer = () => {
  const [supplyerName, setSupplyerName] = useState('')
  const [supplyerAddress, setSupplyerAddress] = useState('')
  const [supplyerContact, setSupplyerContact] = useState('')

  const handelSubmit = async () => {
    let supplyerInfo = {
      supplyerName,
      supplyerAddress,
      supplyerContact
    }
    let result = await window.electronic.invoke('addSupplyer', supplyerInfo)

    if (result == 'Supplyer already exists') {
      Swal.fire({ text: result, icon: 'warning', timer: 1500, width: 350 })
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
            <Link to="/supplyer" style={{ color: 'black' }}>
              <Typography sx={{ cursor: 'pointer' }}>
                {' '}
                <KeyboardBackspaceIcon />{' '}
              </Typography>
            </Link>
            <Typography variant="h6" noWrap component="div">
              Add New Supplyer
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Box>
        <Box sx={{ mb: 2 }}>
          <Typography>Supplyer Name</Typography>
          <TextField value={supplyerName} onChange={(e) => setSupplyerName(e.target.value)} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography>Supplyer Address</Typography>
          <TextField value={supplyerAddress} onChange={(e) => setSupplyerAddress(e.target.value)} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography>Supplyer Contact</Typography>
          <TextField value={supplyerContact} onChange={(e) => setSupplyerContact(e.target.value)} />
        </Box>
        <Button variant="contained" onClick={handelSubmit}>
          Add
        </Button>
      </Box>
    </>
  )
}

export default AddNewSupplyer
