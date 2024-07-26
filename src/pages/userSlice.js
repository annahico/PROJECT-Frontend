import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    credentials: {},
  },
  reducers: {
    login: (state, action) => {
      state.credentials = action.payload.credentials;
    },
    userout: (state) => {
      state.credentials = {};
    },
    changeUser: (state, action) => {
      state.credentials = action.payload.credentials;
    },
  },
});

export const { login, userout, changeUser } = userSlice.actions;

export const userDataCheck = (state) => state.user;

export default userSlice.reducer;
