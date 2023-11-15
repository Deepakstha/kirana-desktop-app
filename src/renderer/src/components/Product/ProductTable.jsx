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
import { Button, TableHead } from '@mui/material'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

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

export default function ProductTable({ results }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(15)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - results?.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDelete = async (prod_id, product_name) => {
    Swal.fire({
      text: `Are you sure to delete ${product_name} Productc?`,
      icon: 'warning',
      width: 350,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#FF0000'
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let resultsData = await window.electronic.invoke('deleteProduct', prod_id)
        if (resultsData == 'Product Deleted Successfully') {
          Swal.fire({ text: resultsData, icon: 'success', timer: 1500, width: 350 }).then(() => {
            window.location.reload()
          })
        }
      }
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead sx={{ backgroundColor: '#D9EDF6' }}>
          <TableRow>
            <TableCell sx={{ color: '#316B8A', fontWeight: 'bold', fontSize: 15 }}>S.N.</TableCell>
            <TableCell sx={{ color: '#316B8A', fontWeight: 'bold', fontSize: 15 }} align="right">
              Product Name
            </TableCell>
            <TableCell sx={{ color: '#316B8A', fontWeight: 'bold', fontSize: 15 }} align="right">
              Product Category
            </TableCell>
            <TableCell sx={{ color: '#316B8A', fontWeight: 'bold', fontSize: 15 }} align="right">
              Product Supplyer
            </TableCell>
            <TableCell sx={{ color: '#316B8A', fontWeight: 'bold', fontSize: 15 }} align="right">
              Product Quantity
            </TableCell>
            <TableCell sx={{ color: '#316B8A', fontWeight: 'bold', fontSize: 15 }} align="right">
              Product Price
            </TableCell>
            <TableCell sx={{ color: '#316B8A', fontWeight: 'bold', fontSize: 15 }} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? results?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : results
          ).map((row, index) => (
            <TableRow key={row.prod_id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell align="right">{row.product_name || '-'}</TableCell>
              <TableCell align="right">{row.product_category || '-'}</TableCell>
              <TableCell align="right">
                {' '}
                {row.product_supplyer ? (
                  <Link to={`/update-supplyer/${row.supplyer_id}`}>
                    {row.product_supplyer || '-'}{' '}
                  </Link>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell align="right">{row.product_quantity || '-'}</TableCell>
              <TableCell align="right">{row.product_price || '-'}</TableCell>
              <TableCell align="right">
                {' '}
                <Link to={`/update-product/${row.prod_id}`}>
                  <Button>Edit</Button>
                </Link>{' '}
                <Button onClick={() => handleDelete(row.prod_id, row.product_name)}>Delete</Button>{' '}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[15, 25, 35, { label: 'All', value: -1 }]}
              colSpan={3}
              count={results?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page'
                },
                native: true
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
