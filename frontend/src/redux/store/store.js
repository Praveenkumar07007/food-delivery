import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice.js";
import foodSlice from "../features/product/foodSlice.js";
import orderSlice from "../features/product/orderSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    food: foodSlice,
    order: orderSlice,
  },
});
export default store;
