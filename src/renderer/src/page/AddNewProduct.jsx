import {
  AppBar,
  Box,
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

const AddNewProduct = () => {
  const [category, setCategory] = useState('')
  const [supplyer, setSupplyer] = useState('')

  //   const handleChangeCategory = (event) => {
  //     setCategory(event.target.value)
  //   }
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
            <Link to="/product" style={{ color: 'black' }}>
              <Typography sx={{ cursor: 'pointer' }}>
                {' '}
                <KeyboardBackspaceIcon />{' '}
              </Typography>
            </Link>
            <Typography variant="h6" noWrap component="div">
              Add New Product
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {/* Adding Product form  */}
      <Box>
        {/* <Box sx={{ display: 'flex' }}> */}
        <Box>
          <Typography>Product Name</Typography>
          <TextField />
        </Box>
        <Box>
          <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Product Category"
            onChange={(event) => setCategory(event.target.value)}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Box>
        {/* </Box> */}

        {/* <Box sx={{ display: 'flex' }}> */}
        <Box>
          <InputLabel id="demo-simple-select-label">Supplyer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={supplyer}
            label="Supplyer"
            onChange={(event) => setSupplyer(event.target.value)}
          >
            <MenuItem value="Bharati">Bharati</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Box>

        <Box>
          <Typography>Quantity</Typography>
          <TextField />
        </Box>

        <Box>
          <Typography>Price</Typography>
          <TextField />
        </Box>
        {/* </Box> */}
      </Box>
    </>
  )
}

export default AddNewProduct
