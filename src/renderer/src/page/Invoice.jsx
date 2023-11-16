import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import InvoicerTable from '../components/Invoice/InvoiceTable'

const Invoice = () => {
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
              Invoice
            </Typography>
            <Link to="/add-invoice">
              <Button>
                {' '}
                <AddIcon />
                Add New Invoice
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <InvoicerTable />
    </>
  )
}

export default Invoice
