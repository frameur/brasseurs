import React from 'react'
import data from '../services/data'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
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
    fontSize:20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
   

    
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
   
    
    

  },
  '&:last-child td, &:last-child th': {
    border: 0,
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

  // Afficher le total des brasseurs
  const totalBrasseries = Object.values(nbBrasseriesParDepartement).reduce(
    (acc, curr) => acc + curr,
    0
  )

  return (
    <div>
      <Navigation />
      <h2>tableau répartition des brasseurs</h2>
      <TableContainer component={Paper}>
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
              .map(([departement, nbBrasseries], index) => (
                <StyledTableRow key={departement}>
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">{departement}</StyledTableCell>
                  <StyledTableCell align="left">{nbBrasseries}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Tableaubrewers
