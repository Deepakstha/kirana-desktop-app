import * as React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { Button, TableHead, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import BackspaceIcon from '@mui/icons-material/BackspaceOutlined'

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

export default function SalesInvoiceTable({ results, displayNoneOnPrint }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(15)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - results?.length) : 0

  const handleRemove = async (sales_id, product_name) => {
    Swal.fire({
      text: `Are you sure to remove ${product_name} product from invoice ?`,
      icon: 'warning',
      width: 350,
      showCancelButton: true,
      confirmButtonText: 'Remove',
      confirmButtonColor: '#FF0000'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let removeSales = await window.electronic.invoke('removeInvoiceSale', sales_id)
        if (removeSales == 'sales removed') {
          Swal.fire({ text: 'Sales Removed', icon: 'success', timer: 1500, width: 350 }).then(
            () => {
              window.location.reload()
            }
          )
        }
      }
    })
  }
  const sum = results.reduce((total, current) => total + current?.total_product_price, 0)

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead sx={{ backgroundColor: '#D9EDF6' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 15 }}>S.N.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 15 }} align="right">
                Product Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 15 }} align="right">
                Product Quantity
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 15 }} align="right">
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: 15 }} align="right">
                Total Price
              </TableCell>
              {!displayNoneOnPrint ? (
                <TableCell sx={{ fontWeight: 'bold', fontSize: 15 }} align="right">
                  Remove
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? results?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : results
            )?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell align="right">{row.product_name || '-'}</TableCell>
                <TableCell align="right">{row.product_quantity || '-'}</TableCell>

                <TableCell align="right">{row.product_price || '-'}</TableCell>
                <TableCell align="right">{row.total_product_price || '-'}</TableCell>
                {!displayNoneOnPrint ? (
                  <TableCell align="right">
                    {' '}
                    <BackspaceIcon
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'red'
                        }
                      }}
                      onClick={() => handleRemove(row.sales_id, row.product_name)}
                    />
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography sx={{ float: 'right' }}> Grand Total: {sum} </Typography>
    </>
  )
}
