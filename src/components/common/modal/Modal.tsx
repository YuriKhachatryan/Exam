import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { IProduct } from "../../../interface/interface";
import { Button, TextField } from "@mui/material";
import { componentStyle } from "./style";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { createCart } from "../../../store/cartSlice";
import CustomizedSnackbars from "../snackbar/Snackbar";
import { useState } from "react";

const { boxGlobal, boxStyles } = componentStyle;

export default function BasicModal({ product, open, setOpen }: any) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [count, setCount] = useState(1);
  const handleClose = () => setOpen(false);

  const dispatch: AppDispatch = useDispatch();

  const addToCart = async () => {
    try {
      const cartData = { ...product, count };
      await dispatch(createCart(cartData));
      setOpenSnackbar(true);
      handleClose();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const renderProductDetails = (product: IProduct) => {
    return (
      <>
        {Object.entries(product).map(([key, value]) => (
          <Box key={key}>
            <Typography variant="subtitle1" component="span">
              {key}:
            </Typography>{" "}
            {Array.isArray(value) ? value.join(", ") : value}
          </Box>
        ))}
      </>
    );
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box {...boxGlobal}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                style={{ padding: "6px" }}
                src={product.imageUrl}
                alt="Product"
              />
              <Box {...boxStyles}>
                <Button onClick={handleClose} variant="contained">
                  Close
                </Button>
                <Button onClick={addToCart} size="small" variant="outlined">
                  Add to cart
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box p={2}>
                <Typography variant="h6" component="h2">
                  {product.title}
                </Typography>
                {renderProductDetails(product)}
                <TextField
                  value={count}
                  type="number"
                  onChange={(e) => {
                    setCount(Number(e.target.value));
                  }}
                  label="select quantity"
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>
          {openSnackbar ? (
            <CustomizedSnackbars
              open={openSnackbar}
              setOpen={setOpenSnackbar}
              messageText="Cart added successfully."
            />
          ) : null}
        </Box>
      </Modal>
    </Box>
  );
}
