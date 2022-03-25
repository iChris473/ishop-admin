import * as React from 'react';
import {useNavigate} from 'react-router';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Tables() {
  const navigate = useNavigate()
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">
              <p className="flex font-bold text-sm text-white whitespace-nowrap">
                Perfume
              </p>
            </StyledTableCell>
            <StyledTableCell align="left">
              <p className="flex font-bold text-sm text-white whitespace-nowrap">
                Price
              </p>
            </StyledTableCell>
            <StyledTableCell align="left">
              <p className="flex font-bold text-sm text-white whitespace-nowrap">
                Stock
              </p>
            </StyledTableCell>
            <StyledTableCell align="left">
              <p className="flex font-bold text-sm text-white whitespace-nowrap">
                Action
              </p>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <div className="flex items-center justify-between gap-2">
                  <img
                    src={require(".././images/p1.png")}
                    className="h-10 w-10"
                  />
                  <p className="flex-1 font-bold text-md text-gray-700 whitespace-nowrap">
                    {row.name}
                  </p>
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="font-bold text-md text-gray-700 whitespace-nowrap">
                  {row.name}
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="flex font-bold text-sm text-gray-700 whitespace-nowrap">
                  March 1
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <div className="flex items-center justify-start gap-3">
                  <button onClick={() => navigate("/about")} className="font-bold text-md p-1 px-2 text-white text-center rounded-md bg-green-600 opacity-80">
                    View
                  </button>
                  <button onClick={() => navigate("/edit")} className="font-bold text-md p-1 px-2 text-center text-white rounded-md bg-pink-600 opacity-80">
                    Edit
                  </button>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
