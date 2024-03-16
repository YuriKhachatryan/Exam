import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT, LOCALSTORAGE } from "../constants";
import { ICart, IOrder, IProduct } from "../interface/interface";

interface OrderState {
  orderData: Array<IOrder> | null;
}

const initialState: OrderState = {
  orderData: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (ordersData: IProduct[], thunkAPI) => {
    try {
      const userData =
        JSON.parse(localStorage.getItem(LOCALSTORAGE.USER_INFO) ?? "") || {};
      const order = {
        date: new Date(),
        items: [...ordersData],
        userid: userData.id,
      };
      const response = await axios.post(`${API_ENDPOINT}/orders`, order);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOrderData = createAsyncThunk(
  "order/fetchOrdersData",
  async (_, thunkAPI) => {
    try {
      const userData =
        JSON.parse(localStorage.getItem(LOCALSTORAGE.USER_INFO) ?? "") || {};
      const response = await axios.get(`${API_ENDPOINT}/orders`);
      const userDataId = userData.id;
      const orderData = response.data.filter(
        (item: IOrder) => item.userid === userDataId
      );
      return orderData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderData: (state, action: PayloadAction<IOrder[]>) => {
      state.orderData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderData.fulfilled, (state, action) => {
      state.orderData = action.payload;
    });
  },
});

export const { setOrderData } = orderSlice.actions;
export const selectOrderData = (state: { order: OrderState }) =>
  state.order.orderData;

export default orderSlice.reducer;
