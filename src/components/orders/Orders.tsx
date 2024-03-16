import React, { FC, useEffect, useState } from "react";
import {
  Container,
  ThemeProvider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { theme } from "../../styles/componentsStyles";
import { cartStyle } from "./style";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { ICart, IOrder } from "../../interface/interface";
import { fetchOrderData } from "../../store/orderSlice";

const { containerStyles } = cartStyle;

const OrderList: FC = () => {
  const [data, setData] = useState<IOrder[]>([]);

  const dispatch: AppDispatch = useDispatch();

  const fetchData = async () => {
    try {
      const data = await dispatch(fetchOrderData());
      setData(data.payload);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container {...containerStyles}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Items</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((value: IOrder) => (
                <TableRow
                  key={value.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{value.id}</TableCell>
                  <TableCell align="left">{`${value.date}`}</TableCell>
                  {value.items.map((item: ICart) => (
                    <TableRow
                      key={value.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{item.title}</TableCell>
                      <TableCell align="left">{item.count}</TableCell>
                      <TableCell align="left">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default OrderList;
