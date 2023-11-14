import React from 'react'
import ProductTable from '../components/Product/ProductTable'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const Product = () => {
  return (
   <>
   <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: `240px` },
          backgroundColor:"white",
          color:'black'
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"

            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Box sx={{ display:"flex", justifyContent:"space-between",  width:"100%"}}>
          <Typography variant="h6" noWrap component="div">
            Product
          </Typography>
          <Link to="/add-product">
          <Button> <AddIcon/>Add New Product</Button>
          </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar/>
   <ProductTable/>
   </>
  )
}

export default Product