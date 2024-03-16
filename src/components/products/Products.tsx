import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { IProduct } from "../../interface/interface";
import BasicModal from "../common/modal/Modal";
import { createCart } from "../../store/cartSlice";
import CustomizedSnackbars from "../common/snackbar/Snackbar";
import { useProductData, useSortingAndFiltering } from "./useProductManagement";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./style";

const Products: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const productData = useProductData();
  const {
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filterPrice,
    setFilterPrice,
    data,
    applyFilters,
    resetFilters,
  } = useSortingAndFiltering(productData);

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const addToCart = async (product: IProduct) => {
    try {
      const productData = { ...product, count: 1 };
      await dispatch(createCart(productData));
      setOpenSnackbar(true);
      handleClose();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const seeProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const selectedOption = event.target.value;
    setSortBy(selectedOption);
  };

  const handleOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setFilterPrice(newValue as number[]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container sx={{ marginTop: "32px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Typography>Sort By:</Typography>
        <Select value={sortBy} onChange={handleSortChange}>
          <MenuItem value="price">Price</MenuItem>
        </Select>
        <Button variant="outlined" onClick={handleOrderChange}>
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </Button>
      </Box>
      <Box sx={{ mb: "32px" }}>
        <Typography>Price</Typography>
        <Slider
          value={filterPrice}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={99999}
          step={1}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Button variant="outlined" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="outlined" onClick={resetFilters}>
            Reset Filters
          </Button>
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearchChange}
          />
        </Search>
      </Box>
      <Grid container spacing={2}>
        {filteredProducts.map((product: IProduct) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ maxWidth: 345, minHeight: 400 }}>
              <CardMedia
                sx={{ height: 200 }}
                image={product.imageUrl}
                title={product.title}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ marginTop: "auto", flexDirection: "" }}>
                  <Box sx={{ display: "flex", gap: "12px" }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => seeProduct(product)}
                    >
                      Watch
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </Button>
                  </Box>
                </CardActions>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      {open && (
        <BasicModal product={selectedProduct} setOpen={setOpen} open={open} />
      )}
      {openSnackbar && (
        <CustomizedSnackbars
          open={openSnackbar}
          setOpen={setOpenSnackbar}
          messageText="Cart added successfully."
        />
      )}
    </Container>
  );
};

export default Products;
