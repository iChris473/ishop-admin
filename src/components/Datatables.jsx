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
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useRecoilState } from "recoil";
import { productItem } from "../modalAtom";

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



export default function Tables() {

  const {user} = React.useContext(AuthContext)
  const request = axios.create({
    baseURL: "https://iperfume.herokuapp.com/api",
    headers: { token: `Bearer ${user?.token}`}
  });

  const navigate = useNavigate()
  const [productItems, SetProductItems] = useRecoilState(productItem)
  const [allProducts, setAllProducts] = React.useState([])
  React.useEffect(() => {
    const getProducts = async () => {
      try{
        const res = await request.get("/product/get")
        console.log(res.data)
        setAllProducts(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    getProducts()
  }, [])

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
          {allProducts.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                <div className="flex items-center justify-between gap-2">
                  <img
                    src={row.picture}
                    className="h-10 w-10"
                  />
                  <p className="flex-1 font-bold text-md text-gray-700 whitespace-nowrap">
                    {row.name}
                  </p>
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="font-bold text-md text-gray-700 whitespace-nowrap">
                  {row.price}
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="flex font-bold text-sm text-gray-700 whitespace-nowrap">
                  {row.quantity}
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <div className="flex items-center justify-start gap-3">
                  <button onClick={() => {SetProductItems(row); navigate("/about")}} className="font-bold text-md p-1 px-2 text-white text-center rounded-md bg-green-600 opacity-80">
                    View
                  </button>
                  <button onClick={() => {SetProductItems(row); navigate("/edit")}} className="font-bold text-md p-1 px-2 text-center text-white rounded-md bg-pink-600 opacity-80">
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
