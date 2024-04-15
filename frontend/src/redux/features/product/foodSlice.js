import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItem: [],
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartQty: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
        .map((item) => item.quantity)
        .reduce((a, b) => a + b, 0)
    : 0,
  cartValue: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
        .map((item) => item.price * item.quantity)
        .reduce((a, b) => a + b, 0)
    : 0,
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    selectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    cartItems: (state, action) => {
      state.cart = action.payload;
    },
    updateCartQty: (state, action) => {
      state.cartQty = action.payload;
    },
  },
});

export const { selectedItem, cartItems, updateCartQty } = foodSlice.actions;

export default foodSlice.reducer;
