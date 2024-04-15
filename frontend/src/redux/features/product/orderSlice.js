import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: JSON.parse(localStorage.getItem("address")) || {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { updateAddress } = orderSlice.actions;
export default orderSlice.reducer;
