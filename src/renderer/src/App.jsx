import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import SideNav from './components/sideNav/SideNav'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import Product from './page/Product'
import Supplyer from './page/Supplyer'
import Customer from './page/Customer'
import Invoice from './page/Invoice'
import AddNewProduct from './page/AddNewProduct'
import AddNewSupplyer from './page/AddNewSupplyer'
import AddNewCustomer from './page/AddNewCustomer'
import EditSupplyer from './components/Supplyer/EditSupplyer'
import EditCustomer from './components/Customer/EditCustomer'

function App() {
  // const ipcRenderer = window.electron.ipcRenderer

  // const [desc, setDesc] = useState('')
  // const handelSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(desc)
  //   ipcRenderer.send('submit:todoForm', desc)
  // }
  return (
    <Box>
      {/* <SideNav/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SideNav />}>
            <Route path="product" element={<Product />} />
            <Route path="add-product" element={<AddNewProduct />} />
            <Route path="supplyer" element={<Supplyer />} />
            <Route path="add-supplyer" element={<AddNewSupplyer />} />
            <Route path="update-supplyer/:sup_id" element={<EditSupplyer />} />
            <Route path="customer" element={<Customer />} />
            <Route path="add-customer" element={<AddNewCustomer />} />
            <Route path="update-customer/:cus_id" element={<EditCustomer />} />
            <Route path="invoice" element={<Invoice />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App
