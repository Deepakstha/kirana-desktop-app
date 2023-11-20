import { AppBar, Box, Button, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const EditSupplyer = () => {
  const [supplyerName, setSupplyerName] = useState('')
  const [supplyerAddress, setSupplyerAddress] = useState('')
  const [supplyerContact, setSupplyerContact] = useState('')
  let { sup_id } = useParams()

  let result
  const deepak = async () => {
    result = await window.electronic.invoke('editSupplyer', sup_id)
    console.log(result)
    setSupplyerName(result[0].supplyer_name)
    setSupplyerAddress(result[0].supplyer_address)
    setSupplyerContact(result[0].supplyer_contact)
    // setResults(result)
  }
  useEffect(() => {
    deepak()
  }, [result])

  const handelSubmit = async () => {
    let supplyerInfo = {
      supplyerName,
      supplyerAddress,
      supplyerContact,
      sup_id
    }
    if (supplyerName == '') {
      return await Swal.fire({ text: 'Supplyer Name is Empty', width: 350, icon: 'error' })
    } else if (supplyerAddress == '') {
      return await Swal.fire({ text: 'Supplyer Address is Empty', width: 350, icon: 'error' })
    } else if (supplyerContact == '') {
      return await Swal.fire({ text: 'Supplyer Contact is Empty', width: 350, icon: 'error' })
    }
    let result = await window.electronic.invoke('updateSupplyer', supplyerInfo)
    console.log(result)

    if (result == 'Supplier updated') {
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
            <Link to="/supplyer" style={{ color: 'black' }}>
              <Typography sx={{ cursor: 'pointer' }}>
                {' '}
                <KeyboardBackspaceIcon />{' '}
              </Typography>
            </Link>
            <Typography variant="h6" noWrap component="div">
              Update Supplyer
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
          Update
        </Button>
      </Box>
    </>
  )
}

export default EditSupplyer
