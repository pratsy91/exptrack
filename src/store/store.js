import { configureStore } from "@reduxjs/toolkit";
import leaderSlice from "./leaderSlice";
import pageSlice from "./pageSlice";

const store = configureStore({
  reducer: {
    leadersReducer: leaderSlice.reducer,
    pageReducer: pageSlice.reducer,
  },
});

export default store;
