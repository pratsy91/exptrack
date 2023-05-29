import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expenseSlice";
import authSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    expenseReducer: expenseSlice.reducer,
  },
});

export default store;
