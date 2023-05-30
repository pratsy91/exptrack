import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expenseSlice";
import premiumSlice from "./premiumslice";
import leaderSlice from "./leaderSlice";

const store = configureStore({
  reducer: {
    expenseReducer: expenseSlice.reducer,
    premiumReducer:premiumSlice.reducer,
    leadersReducer:leaderSlice.reducer,
  },
});

export default store;
