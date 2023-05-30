import { createSlice } from "@reduxjs/toolkit";

const premiumSlice = createSlice({
  name:"premium",
  initialState:{isPremium:false},
  reducers:{
    setPremium(state,action){
      const bool= action.payload.bool;
      state.isPremium=bool;
    }
  }
})

export const premiumActions = premiumSlice.actions;

export default premiumSlice;