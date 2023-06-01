import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "pagination",
  initialState: { pageData: {} },
  reducers: {
    setPageData(state, action) {
      const data = action.payload.pageData;
      state.pageData = data;
    },
  },
});

export const pageActions = pageSlice.actions;

export default pageSlice;
