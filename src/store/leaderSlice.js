import { createSlice } from "@reduxjs/toolkit";

const leaderSlice = createSlice({
  name: "leaders",
  initialState: { leaders: [] },
  reducers: {
    setExpense(state, action) {
      const data = action.payload;
      state.leaders = data.leaders;
    },
  },
});

export const leaderActions = leaderSlice.actions;

export default leaderSlice;
