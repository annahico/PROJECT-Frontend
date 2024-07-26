import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentData: {},
  },
  reducers: {
    loadPaymentData: (state, action) => {
      state.paymentData = action.payload;
    },
    changePaymentData: (state, action) => {
      state.paymentData = action.payload;
    },
  },
});

export const { loadPaymentData, changePaymentData } = paymentSlice.actions;

export const paymentDataCheck = (state) => state.payment;

export default paymentSlice.reducer;
