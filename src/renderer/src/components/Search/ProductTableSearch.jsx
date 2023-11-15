import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { Button, MenuItem, Select, TextField } from '@mui/material'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

export default function ProductTableSearch({
  setSearchValue,
  searchValue,
  setSearchPriceValue,
  searchPriceValue,
  setPriceGreterLessValue,
  priceGreterLessValue,
  searchQuantityValue,
  setSearchQuantityValue,
  quantityGraterLessValue,
  setQuantityGraterLessValue
}) {
  const handleChange = (event) => {
    setPriceGreterLessValue(event.target.value)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography
          variant="h9"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          <Button onClick={() => window.location.reload()}>ALL</Button>
        </Typography>

        <Box sx={{ gap: 5, display: 'flex' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quantityGraterLessValue}
              label="Price"
              onChange={(e) => setQuantityGraterLessValue(e.target.value)}
              sx={{ height: 40 }}
              variant="filled"
            >
              <MenuItem value="greater">greater</MenuItem>
              <MenuItem value="less">less</MenuItem>
            </Select>
            <TextField
              value={searchQuantityValue}
              onChange={(e) => setSearchQuantityValue(e.target.value)}
              placeholder="Quantity"
              type="number"
              inputProps={{ 'aria-label': 'search' }}
              variant="filled"
              InputProps={{ sx: { height: 40, width: 150 } }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priceGreterLessValue}
              label="Price"
              onChange={handleChange}
              sx={{ height: 40 }}
              variant="filled"
            >
              <MenuItem value="greater">greater</MenuItem>
              <MenuItem value="less">less</MenuItem>
            </Select>
            <TextField
              value={searchPriceValue}
              onChange={(e) => setSearchPriceValue(e.target.value)}
              placeholder="Search Price"
              type="number"
              inputProps={{ 'aria-label': 'search' }}
              variant="filled"
              InputProps={{ sx: { height: 40, width: 150 } }}
            />
          </Box>
        </Box>

        <Search sx={{ border: 1 }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search product"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </Toolbar>
    </Box>
  )
}
