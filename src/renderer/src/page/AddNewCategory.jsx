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
import React, { useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const AddNewCategory = () => {
  const [categoryName, setCategoryName] = useState('')

  const handelSubmit = async () => {
    if (categoryName == '') {
      return await Swal.fire({ text: 'Please fill the text field', width: 350, icon: 'error' })
    }
    let result = await window.electronic.invoke('addCategory', categoryName)

    if (result == 'Category already exists') {
      Swal.fire({ text: result, icon: 'warning', timer: 1500, width: 350 })
    } else if (result == 'Category Added') {
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
            <Link to="/category" style={{ color: 'black' }}>
              <Typography sx={{ cursor: 'pointer' }}>
                {' '}
                <KeyboardBackspaceIcon />{' '}
              </Typography>
            </Link>
            <Typography variant="h6" noWrap component="div">
              Add New Category
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Box>
        <Box sx={{ mb: 2 }}>
          <Typography>Category Name</Typography>
          <TextField value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        </Box>

        <Button variant="contained" onClick={handelSubmit}>
          Add Category
        </Button>
      </Box>
    </>
  )
}

export default AddNewCategory
