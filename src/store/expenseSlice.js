import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: { expenses: [] },
  reducers: {
    setExpense(state, action) {
      const data = action.payload;
      state.expenses = data.expenses;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
