import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import SupplyerTable from '../components/Supplyer/SupplyerTable'
import TableSearch from '../components/Search/TableSearch'

const Supplyer = () => {
  const [results, setResults] = useState([])
  const [searchValue, setSearchValue] = useState('')
  let result
  const deepak = async () => {
    result = await window.electronic.invoke('displaySupplyer', 'Supplyer Clicked')
    console.log(result)
    setResults(result)
  }
  useEffect(() => {
    deepak()
  }, [result])

  const searchFunc = async () => {
    result = await window.electronic.invoke('searchSupplyer', `%${searchValue}%`)
    console.log(result)
    setResults(result)
  }
  useEffect(() => {
    if (searchValue?.length > 0) {
      searchFunc()
    } else {
      deepak()
    }
  }, [searchValue])

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
              Sypplyer
            </Typography>
            <Link to="/add-supplyer">
              <Button>
                {' '}
                <AddIcon />
                Add New Supplyer
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <TableSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      <SupplyerTable results={results.sort((a, b) => b.sup_id - a.sup_id)} />
    </>
  )
}

export default Supplyer
