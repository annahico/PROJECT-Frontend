import { createSlice } from "@reduxjs/toolkit";

export const designSlice = createSlice({
  name: "design",
  initialState: {
    designData: {},
  },
  reducers: {
    loadDesignData: (state, action) => {
      state.designData = action.payload;
    },
  },
});

export const { loadDesignData } = designSlice.actions;

export const designDataCheck = (state) => state.design;

export default designSlice.reducer;
