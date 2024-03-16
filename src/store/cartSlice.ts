import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT, LOCALSTORAGE } from "../constants";
import { ICart, IProduct } from "../interface/interface";
import { RootState } from "./store";

interface CartState {
  cartData: Array<ICart> | null;
}

const initialState: CartState = {
  cartData: null,
};

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (cartData: IProduct) => {
    const userData = JSON.parse(
      localStorage.getItem(LOCALSTORAGE.USER_INFO) as string
    );
    const order = {
      ...cartData,
      userId: userData.id,
    };

    const response = await axios.post(`${API_ENDPOINT}/carts`, order);
    return response.data;
  }
);

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async () => {
    const userData = JSON.parse(
      localStorage.getItem(LOCALSTORAGE.USER_INFO) as string
    );
    const response = await axios.get(`${API_ENDPOINT}/carts`);
    const userDataId = userData.id;
    return response.data.filter((item: ICart) => item.userId === userDataId);
  }
);

export const deleteCartData = createAsyncThunk(
  "cart/deleteCartData",
  async (cartId: string) => {
    await axios.delete(`${API_ENDPOINT}/carts/${cartId}`);
    return cartId;
  }
);

export const fetchEditCart = createAsyncThunk<
  any,
  { cartId: string; cartData: ICart }
>("auth/fetchEditCart", async ({ cartId, cartData }) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/carts/${cartId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartData.fulfilled, (state, action) => {
      state.cartData = action.payload || null;
    });
    builder
      .addCase(deleteCartData.fulfilled, (state, action) => {
        state.cartData =
          state.cartData?.filter((item) => item.id !== action.payload) || null;
      })
      .addCase(fetchEditCart.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        if (state.cartData) {
          const index = state.cartData.findIndex(
            (cartData) => cartData.id === updatedProduct.id
          );
          if (index !== -1) {
            state.cartData[index] = updatedProduct;
          }
        }
      });
  },
});

export const selectCartData = (state: RootState) => state.cart.cartData;

export default cartSlice.reducer;
