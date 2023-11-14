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

const EditCategory = () => {
  const [categoryName, setCategoryName] = useState('')
  let { cat_id } = useParams()

  let result
  const deepak = async () => {
    result = await window.electronic.invoke('editCategory', cat_id)
    setCategoryName(result[0].category_name)
    // setResults(result)
  }
  useEffect(() => {
    deepak()
  }, [result])

  const handelSubmit = async () => {
    let categoryInfo = {
      categoryName,
      cat_id
    }
    let resultData = await window.electronic.invoke('updateCategory', categoryInfo)
    if (resultData == 'Category Updated') {
      Swal.fire({ text: resultData, icon: 'success', timer: 1500, width: 350 })
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
          Update
        </Button>
      </Box>
    </>
  )
}

export default EditCategory
