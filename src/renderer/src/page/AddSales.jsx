import { Box, Button, Card, CardContent, Divider, TextField, Typography } from '@mui/material'
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
  const [selectedProductQuantity, setSelectedProductQuantity] = useState()

  const invoiceDetails = async () => {
    let data = await window.electronic.invoke('displayInvoiceDetails', invoice_id)
    setCustomerInfo(data)
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

    if (productQuantity == '') {
      return await Swal.fire({ text: 'Please insert Quantity', icon: 'error', width: 350 })
    }

    if (productQuantity > selectedProductQuantity) {
      Swal.fire({
        text: 'You can not add more than available quantity',
        width: 350,
        icon: 'error'
      })
    } else {
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
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Product Name</Typography>
          <TextField
            value={searchProductValue}
            onChange={(e) => setSearchProductValue(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Quantity</Typography>
          <TextField
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={handelSubmit} sx={{ mb: 2 }}>
          Add
        </Button>
      </Box>
      {forProductTable && forProductTable.length > 0 ? (
        <InvoiceProductTable
          setSearchProductValue={setSearchProductValue}
          setProductId={setProductId}
          results={forProductTable}
          setSelectedProductQuantity={setSelectedProductQuantity}
        />
      ) : null}

      <Card sx={{ mt: 3 }}>
        <Box sx={{ padding: 10 }} ref={componentRef}>
          <Typography sx={{ textAlign: 'center' }}>Invoice</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography>Customer Name: {customerInfo?.customer_name}</Typography>
              <Typography>Customer Address: {customerInfo?.customer_address}</Typography>
              <Typography>Customer Contact: {customerInfo?.customer_contact}</Typography>
            </Box>
            <Box>
              <Typography>Invoice ID: {customerInfo?.invoice_id}</Typography>
              <Typography>Date: {customerInfo?.invoice_date?.split(' ')[0]}</Typography>
            </Box>
          </Box>

          {invoiceProduct && invoiceProduct?.length > 0 ? (
            <SalesInvoiceTable displayNoneOnPrint={displayNoneOnPrint} results={invoiceProduct} />
          ) : null}
        </Box>
        <Button sx={{ ml: 10 }} onClick={handlePrintContent}>
          print
        </Button>
      </Card>
    </>
  )
}

export default AddSales
