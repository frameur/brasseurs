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
const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  color: theme.palette.error.main,
  backgroundColor: theme.palette.common.black,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  fontSize: 24,
  fontWeight: 'bold',


  '& .MuiTablePagination-displayedRows': {
    margin: theme.spacing(1, 0),
  },
  '& .MuiTablePagination-spacer': {
    flex: 'none',
  },
  '& .MuiTablePagination-select': {
    margin: theme.spacing(1, 0),
  },
  '& .MuiTablePagination-selectLabel': {
    marginRight: theme.spacing(1),
  },
  '& .MuiTablePagination-actions': {
    justifyContent: 'flex-end',
  },
  [theme.breakpoints.down('sm')]: { // Ajoutez des Media Queries ici
    padding: theme.spacing(1), // Réduisez la valeur de padding pour les petits écrans
    '& .MuiTablePagination-displayedRows': {
      display: 'none', // Cachez le nombre de lignes affichées pour les petits écrans
    },
    '& .MuiTablePagination-spacer': {
      display: 'none', // Cachez l'espaceur pour les petits écrans
    },
    '& .MuiTablePagination-select': {
      display: 'none', // Cachez la sélection du nombre de lignes par page pour les petits écrans
    },
  },
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.error.main, // Changez la couleur du texte en rouge
  backgroundColor: theme.palette.common.black, // Changez la couleur d'arrière-plan en noir
    fontSize: 24,
    fontFamily: 'Roboto, Arial, Verdana',
    letterSpacing: '0.5px',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 22,
    fontFamily: 'Roboto, Arial, Verdana',
    letterSpacing: '0.5px',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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
        <StyledTablePagination
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
