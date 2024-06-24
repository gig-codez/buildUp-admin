import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  token: localStorage.getItem("token"), // persist token in localStorage
  userId: null,
  name: null,
  email: null,
  isAuthenticated: !!localStorage.getItem("token"),
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    //setting the color mode
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.name = null;
      state.email = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setMode, loginSuccess, logout } = globalSlice.actions;

export default globalSlice.reducer;
