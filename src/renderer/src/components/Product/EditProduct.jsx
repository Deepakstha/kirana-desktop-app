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
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const EditProduct = () => {
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [supplyer, setSupplyer] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [supplyer_id, setSupplyerId] = useState('')
  let { prod_id } = useParams()

  console.log(supplyer, category, 'slfl')

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

  let result
  const deepak = async () => {
    result = await window.electronic.invoke('editProduct', prod_id)
    setProductName(result[0].product_name)
    setCategory(result[0].product_category)
    setSupplyer(result[0].product_supplyer)
    setQuantity(result[0].product_quantity)
    setPrice(result[0].product_price)
    setSupplyerId(result[0].supplyer_id)
  }
  useEffect(() => {
    deepak()
  }, [result])

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

  const handelSupplyerNull = () => {
    setSupplyer('')
    setSupplyerId('')
  }

  const handelSubmit = async () => {
    let productInfo = {
      productName,
      category,
      supplyer,
      quantity,
      price,
      prod_id,
      supplyer_id
    }
    let result = await window.electronic.invoke('updateProduct', productInfo)

    if (result == 'Product Updated') {
      Swal.fire({
        text: 'Product Updated',
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
              Update Product
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
            value={category}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, newValue) => setCategory(newValue)}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography>Supplyer</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Autocomplete
              disablePortal
              {...supplyerProps}
              sx={{ width: 300 }}
              value={{ sup_id: supplyer_id, supplyer_name: supplyer }}
              renderInput={(params) => <TextField {...params} />}
              onChange={(event, newValue) => {
                setSupplyer(newValue.supplyer_name)
                setSupplyerId(newValue.sup_id)
              }}
            />{' '}
            <Button onClick={handelSupplyerNull}>set null</Button>
            {/* <Typography>{supplyer && supplyer?.supplyer_name}</Typography> */}
          </Box>
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
          Update
        </Button>
      </Box>
    </>
  )
}

export default EditProduct
