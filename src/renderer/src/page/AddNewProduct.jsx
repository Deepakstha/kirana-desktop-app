import {
  AppBar,
  Autocomplete,
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
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const AddNewProduct = () => {
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [supplyer, setSupplyer] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  const [allCategory, setAllCategory] = useState([])
  const [allSupplyers, setAllSupplyers] = useState([])

  const defprops = {
    options: allCategory?.map((option) => option.category_name),
    getOptionLabel: (options) => options
  }

  const supplyerProps = {
    options: allSupplyers?.map((option) => ({
      sup_id: option.sup_id,
      supplyer_name: option.supplyer_name
    })),
    getOptionLabel: (options) => options.supplyer_name
  }

  const handleAllCategory = async () => {
    let result = await window.electronic.invoke('displayCategory', 'Category Clicked')
    setAllCategory(result)
  }

  const handleSupplyer = async () => {
    let supplyers = await window.electronic.invoke('displaySupplyer', 'Suppliers')
    setAllSupplyers(supplyers)
  }

  useEffect(() => {
    handleAllCategory()
    handleSupplyer()
  }, [])

  const handelSubmit = async () => {
    let productInfo = {
      productName,
      category,
      supplyer,
      quantity,
      price
    }
    if (productName == '') {
      return await Swal.fire({ text: 'Product name cannot be empty', width: 350, icon: 'error' })
    } else if (price == '') {
      return await Swal.fire({ text: 'Please insert Price', width: 350, icon: 'error' })
    }
    let result = await window.electronic.invoke('addProduct', productInfo)

    if (result == 'Product already Exist') {
      Swal.fire({
        text: 'This Product is already exist please go to edit page and Update the Quantity of the product',
        icon: 'error',
        timer: 1500,
        width: 350
      })
    } else if (result == 'Product Added') {
      Swal.fire({
        text: 'Product Added',
        icon: 'success',
        timer: 1500,
        width: 350
      })
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
        <Box sx={{ mb: 2 }}>
          <Typography>Product Name</Typography>
          <TextField
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: 300 }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography>Product Category</Typography>

          <Autocomplete
            disablePortal
            {...defprops}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, newValue) => setCategory(newValue)}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography>Supplyer</Typography>

          <Autocomplete
            disablePortal
            {...supplyerProps}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, newValue) => setSupplyer(newValue)}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography>Quantity</Typography>
          <TextField
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ width: 300 }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography>Price</Typography>
          <TextField
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ width: 300 }}
          />
        </Box>
        {/* </Box> */}
        <Button variant="contained" onClick={handelSubmit}>
          Add Product
        </Button>
      </Box>
    </>
  )
}

export default AddNewProduct
