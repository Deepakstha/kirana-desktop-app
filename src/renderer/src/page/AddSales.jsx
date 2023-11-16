import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import InvoiceProductTable from '../components/Invoice/InvoiceProductTable'
import Swal from 'sweetalert2'
import SalesInvoiceTable from '../components/Invoice/SalesInvoiceTable'
import { useReactToPrint } from 'react-to-print'

const AddSales = () => {
  const { invoice_id } = useParams()
  const [searchProductValue, setSearchProductValue] = useState()
  const [forProductTable, setForProductTable] = useState([])
  const [productId, setProductId] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const [customerInfo, setCustomerInfo] = useState(null)
  const [invoiceProduct, setInvoiceProduct] = useState([])

  console.log(searchProductValue, 'searchproductVlaue')
  const invoiceDetails = async () => {
    let data = await window.electronic.invoke('displayInvoiceDetails', invoice_id)
    setCustomerInfo(data)
    console.log(data, 'MY DATA')
  }
  useEffect(() => {
    invoiceDetails()
  }, [])

  const productSearch = async () => {
    let products = await window.electronic.invoke('searchProductByName', `%${searchProductValue}%`)
    setForProductTable(products)
    if (searchProductValue == '') {
      setSearchProductValue(null)
    }
  }
  useEffect(() => {
    productSearch()
  }, [searchProductValue])

  const handelSubmit = async () => {
    let salesInfo = {
      searchProductValue,
      productQuantity,
      productId,
      invoice_id
    }
    let result = await window.electronic.invoke('addSales', salesInfo)
    if (result == 'Product Added to sales') {
      Swal.fire({
        text: `Added Products to the invoice`,
        icon: 'success',
        timer: 1500,
        width: 350
      }).then(() => {
        window.location.reload()
      })
    }
  }

  const displayInvoice = async () => {
    let data = await window.electronic.invoke('displayInvoice', invoice_id)
    console.log(data, 'INVOICE DATA')
    setInvoiceProduct(data)
  }
  useEffect(() => {
    displayInvoice()
  }, [])

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data'
  })
  const [displayNoneOnPrint, setDisplayNoneOnPrint] = useState(false)
  const handlePrintContent = () => {
    handlePrint()
    setDisplayNoneOnPrint(true)
  }
  return (
    <>
      <Box>
        <Box>
          <Typography variant="h6">Product Name</Typography>
          <TextField
            value={searchProductValue}
            onChange={(e) => setSearchProductValue(e.target.value)}
          />
        </Box>
        <Box>
          <Typography variant="h6">Quantity</Typography>
          <TextField
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={handelSubmit}>
          Add
        </Button>
      </Box>
      {forProductTable && forProductTable.length > 0 ? (
        <InvoiceProductTable
          setSearchProductValue={setSearchProductValue}
          setProductId={setProductId}
          results={forProductTable}
        />
      ) : null}

      <Divider />
      <Box ref={componentRef}>
        <Typography sx={{ textAlign: 'center' }}>Invoice</Typography>
        <Typography>Invoice ID: {customerInfo?.invoice_id}</Typography>
        <Typography>Customer Name: {customerInfo?.customer_name}</Typography>
        <Typography>Customer Address: {customerInfo?.customer_address}</Typography>
        <Typography>Customer Contact: {customerInfo?.customer_contact}</Typography>

        {invoiceProduct && invoiceProduct?.length > 0 ? (
          <SalesInvoiceTable displayNoneOnPrint={displayNoneOnPrint} results={invoiceProduct} />
        ) : null}
      </Box>
      <Button onClick={handlePrintContent}>print</Button>
    </>
  )
}

export default AddSales
