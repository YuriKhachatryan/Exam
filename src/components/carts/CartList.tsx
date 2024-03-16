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
  Button,
  TextField,
} from "@mui/material";
import { theme } from "../../styles/componentsStyles";
import { cartStyle } from "./style";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { AppDispatch } from "../../store/store";
import {
  fetchCartData,
  deleteCartData,
  fetchEditCart,
} from "../../store/cartSlice";
import { ICart } from "../../interface/interface";
import { createOrder } from "../../store/orderSlice";
import CustomizedSnackbars from "../common/snackbar/Snackbar";

const { containerStyles } = cartStyle;

const CartList: FC = () => {
  const [data, setData] = useState<ICart[]>([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const dispatch: AppDispatch = useDispatch();

  const fetchData = async () => {
    try {
      const data = await dispatch(fetchCartData());
      setData(data.payload);
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (cartId: string) => {
    await dispatch(deleteCartData(cartId));
    await fetchData();
  };

  const buyProducts = async () => {
    try {
      await dispatch(createOrder(data));
      data.forEach(async (item) => {
        await dispatch(deleteCartData(item.id as string));
      });
      setData([]);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error buying products:", error);
    }
  };

  const handleChange = (value: string, index: number) => {
    setData((prev: ICart[]) => {
      const newData = [...prev];
      newData[index] = { ...newData[index], count: Number(value) };
      return newData;
    });
  };

  const hendleEditCount = async (value: ICart) => {
    await dispatch(
      fetchEditCart({ cartId: value.id as string, cartData: value })
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container {...containerStyles}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((value: ICart, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{value.id}</TableCell>
                  <TableCell align="left">{value.title}</TableCell>
                  <TableCell align="left">{value.price}</TableCell>
                  <TableCell align="left">
                    <TextField
                      value={value.count}
                      type="number"
                      onChange={(e) => {
                        handleChange(e.target.value, index);
                      }}
                      label="count"
                      variant="outlined"
                      onBlur={() => hendleEditCount(value)}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      sx={{ ":hover": { cursor: "pointer" } }}
                      onClick={() => handleDelete(value.id as string)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="outlined" onClick={buyProducts}>
          Buy
        </Button>
        {openSnackbar ? (
          <CustomizedSnackbars
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            messageText="Cart added successfully."
          />
        ) : null}
      </Container>
    </ThemeProvider>
  );
};

export default CartList;
