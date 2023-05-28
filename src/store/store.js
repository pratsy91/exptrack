import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expenseSlice";
const store = configureStore({
  reducer: {
    expenseReducer: expenseSlice.reducer,
  },
});

export default store;
