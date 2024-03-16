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
  Avatar,
  Button,
} from "@mui/material";
import { theme } from "../../styles/componentsStyles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { IProduct } from "../../interface/interface";
import { fetchProductData, selectProductData } from "../../store/productSlice";
import { cartStyle } from "../carts/style";
import EditProduct from "./EditProduct";

const { containerStyles } = cartStyle;

const ProductList: FC = () => {
  const [open, setOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState<IProduct>();

  const data = useSelector(selectProductData);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProductData());
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleEditProduct = (product: IProduct) => {
    setEditedProduct(product);
    setOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container {...containerStyles}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">ImageUrl</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length &&
                data?.map((value: IProduct) => (
                  <TableRow
                    key={value.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{value.id}</TableCell>
                    <TableCell align="left">
                      <Avatar alt={value.title} src={value.imageUrl} />
                    </TableCell>
                    <TableCell align="left">{value.title}</TableCell>
                    <TableCell align="left">{value.description}</TableCell>
                    <TableCell align="left">{value.price}</TableCell>
                    <TableCell align="left">{value.count}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        onClick={() => handleEditProduct(value)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {open && editedProduct ? (
          <EditProduct product={editedProduct} open={open} setOpen={setOpen} />
        ) : null}
      </Container>
    </ThemeProvider>
  );
};

export default ProductList;
