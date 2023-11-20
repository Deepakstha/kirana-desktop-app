import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {
  ProductionQuantityLimitsOutlined,
  StorefrontOutlined,
  PeopleOutlineOutlined,
  ReceiptLongOutlined,
  WidgetsOutlined,
  MonetizationOnOutlined,
  ShoppingBagOutlined
} from '@mui/icons-material'

import { Link, Outlet } from 'react-router-dom'

const drawerWidth = 240

function SideNav(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar> Kirana </Toolbar>
      <Divider />
      <List>
        {/* {['Product', 'Supplyers', 'Customer', 'Invoice'].map((text, index) => ( */}
        <Link to="/product" style={{ color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ProductionQuantityLimitsOutlined />
              </ListItemIcon>
              <ListItemText primary="Product" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/supplyer" style={{ color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StorefrontOutlined />
              </ListItemIcon>
              <ListItemText primary="Supplyers" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/customer" style={{ color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleOutlineOutlined />
              </ListItemIcon>
              <ListItemText primary="Customer" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/invoice" style={{ color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ReceiptLongOutlined />
              </ListItemIcon>
              <ListItemText primary="Invoice" />
            </ListItemButton>
          </ListItem>
        </Link>
        {/* ))} */}
      </List>
      <Divider />
      <List>
        <Link to="/category" style={{ color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <WidgetsOutlined />
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/sales" style={{ color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MonetizationOnOutlined />
              </ListItemIcon>
              <ListItemText primary="Sales" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      {/* <List>
        <Link to="/fruits" style={{ color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingBagOutlined />
              </ListItemIcon>
              <ListItemText primary="Fruits" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List> */}
    </div>
  )

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default SideNav
