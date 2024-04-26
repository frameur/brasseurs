import React from 'react'
import data from '../services/data_breweries2023'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  TablePagination,
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Navigation from '../components/Navigation'
import './tableaubrewers.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 24,
    fontFamily: 'Roboto, Arial, Verdana',
    letterSpacing: '0.5px',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 22,
    fontFamily: 'Roboto, Arial, Verdana',
    letterSpacing: '0.5px',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    fontWeight: 'bold', // Ajoutez une épaisseur de police ici
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.custom-hover:hover': { // Ajoutez une classe CSS personnalisée pour le style de survol ici
    backgroundColor: theme.palette.action.hover,
  },
}))

function Tableaubrewers() {
  const nbBrasseriesParDepartement = {}

  // Parcourir le tableau de brasseries et compter le nombre de brasseries dans chaque département
  for (let brasserie of data) {
    let departement = brasserie.ville_departement
    if (nbBrasseriesParDepartement[departement]) {
      nbBrasseriesParDepartement[departement]++
    } else {
      nbBrasseriesParDepartement[departement] = 1
    }
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Afficher le total des brasseurs
  const totalBrasseries = Object.values(nbBrasseriesParDepartement).reduce(
    (acc, curr) => acc + curr,
    0
  )

  return (
    <div>
      <Navigation />
      <h1>tableau répartition des brasseurs (Novembre 2023)</h1>
      <TableContainer component={Paper} className="custom-table">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Order</StyledTableCell>
              <StyledTableCell align="left">CP</StyledTableCell>
              <StyledTableCell align="left">
                Nb  ({totalBrasseries})
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(nbBrasseriesParDepartement)
              .sort((a, b) => b[1] - a[1])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(([departement, nbBrasseries], index) => (
                <StyledTableRow key={departement}>
                  <StyledTableCell align="left">{page * rowsPerPage + index +1}</StyledTableCell>
                  <StyledTableCell align="left">{departement}</StyledTableCell>
                  <StyledTableCell align="left">{nbBrasseries}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={Object.entries(nbBrasseriesParDepartement).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  )
}

export default Tableaubrewers
