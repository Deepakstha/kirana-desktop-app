import React, { useState, useEffect } from 'react'
import ProductTable from '../components/Product/ProductTable'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import ProductTableSearch from '../components/Search/ProductTableSearch'

const Product = () => {
  const [results, setResults] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchPriceValue, setSearchPriceValue] = useState('')
  const [priceGreterLessValue, setPriceGreterLessValue] = useState('')
  const [searchQuantityValue, setSearchQuantityValue] = useState('')
  const [quantityGraterLessValue, setQuantityGraterLessValue] = useState('')

  let result
  const deepak = async () => {
    result = await window.electronic.invoke('displayProduct', 'Product Clicked')
    setResults(result)
  }
  useEffect(() => {
    deepak()
  }, [result])

  const searchFunc = async () => {
    result = await window.electronic.invoke('searchProduct', `%${searchValue}%`)
    setResults(result)
  }
  useEffect(() => {
    if (searchValue?.length > 0) {
      searchFunc()
    } else {
      deepak()
    }
  }, [searchValue])

  const searchPriceFunc = async () => {
    let gtrLessValue
    if (priceGreterLessValue === 'greater') {
      gtrLessValue = `>`
    } else {
      gtrLessValue = `<`
    }
    let searchPriceInfo = {
      gtrLessValue,
      searchPriceValue
    }
    result = await window.electronic.invoke('searchProductPrice', searchPriceInfo)
    setResults(result)
  }
  useEffect(() => {
    if (priceGreterLessValue && searchPriceValue?.length > 0) {
      searchPriceFunc()
    } else {
      deepak()
    }
  }, [searchPriceValue, priceGreterLessValue])

  const searchQuantityFunc = async () => {
    let gtrLessValue
    if (quantityGraterLessValue === 'greater') {
      gtrLessValue = `>`
    } else if (quantityGraterLessValue === 'equal') {
      gtrLessValue = `=`
    } else {
      gtrLessValue = `<`
    }

    let searchQuantityInfo = {
      gtrLessValue,
      searchQuantityValue
    }
    result = await window.electronic.invoke('searchProductQuantity', searchQuantityInfo)
    setResults(result)
  }
  useEffect(() => {
    if (quantityGraterLessValue && searchQuantityValue?.length > 0) {
      searchQuantityFunc()
    } else {
      deepak()
    }
  }, [searchQuantityValue, quantityGraterLessValue])
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
              Product
            </Typography>
            <Link to="/add-product">
              <Button>
                {' '}
                <AddIcon />
                Add New Product
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <ProductTableSearch
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        setSearchPriceValue={setSearchPriceValue}
        searchPriceValue={searchPriceValue}
        priceGreterLessValue={priceGreterLessValue}
        setPriceGreterLessValue={setPriceGreterLessValue}
        searchQuantityValue={searchQuantityValue}
        setSearchQuantityValue={setSearchQuantityValue}
        quantityGraterLessValue={quantityGraterLessValue}
        setQuantityGraterLessValue={setQuantityGraterLessValue}
      />
      <ProductTable results={results} />
    </>
  )
}

export default Product
