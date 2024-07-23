import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    credentials: {
      name: "",
      email: "",
      password: "",
      token: "" // Añadido token para manejar la autenticación
    }
  },
  reducers: {
    login: (state, action) => {
      // Actualiza solo las credenciales con los datos del payload
      state.credentials = {
        ...state.credentials,
        ...action.payload
      };
    },
    logout: (state) => {
      // Restablece el estado a los valores iniciales
      state.credentials = {
        name: "",
        email: "",
        password: "",
        token: ""
      };
    }
  }
});

export const { login, logout } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;
