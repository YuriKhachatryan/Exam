import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../constants";
import { IProduct } from "../interface/interface";
import { RootState } from "./store";

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  count: number;
  price: number;
}

interface ProductState {
  productData: Product[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  productData: null,
  isLoading: false,
  error: null,
};

export const createProduct = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("product/createProduct", async (productData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/products`, productData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.message);
    }
    throw error;
  }
});

export const fetchProductData = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("product/fetchProductData", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/products`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.message);
    }
    throw error;
  }
});

export const fetchEditProduct = createAsyncThunk<
  any,
  { productId: string; productData: IProduct }
>("auth/fetchEditProduct", async ({ productId, productData }) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/products/${productId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: (
      state,
      action: PayloadAction<
        Array<{
          id: string;
          title: string;
          description: string;
          imageUrl: string;
          count: number;
          price: number;
        }>
      >
    ) => {
      state.productData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productData = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to fetch products";
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productData?.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to create product";
      })
      .addCase(fetchEditProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        if (state.productData) {
          const index = state.productData.findIndex(
            (product) => product.id === updatedProduct.id
          );
          if (index !== -1) {
            state.productData[index] = updatedProduct;
            state.error = null;
          }
        }
      });
  },
});

export const selectProductData = (state: RootState) =>
  state.product.productData;

export default productSlice.reducer;
