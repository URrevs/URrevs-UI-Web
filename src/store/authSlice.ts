import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import User from "../models/classes/User";

const initialAuthState: User = {
  isLoggedIn: false,
  photo: "",
  accessToken: "",
  apiToken: "",
  name: "",
  refreshToken: "",
  email: "",
  uid: "",
  refCode: "",
  points: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.photo = action.payload.photo;
      state.accessToken = action.payload.accessToken;
      // localStorage.setItem("token", state.accessToken);
      state.apiToken = action.payload.apiToken;
      state.name = action.payload.name;
      state.refreshToken = action.payload.refreshToken;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.refCode = action.payload.refCode;
      state.points = action.payload.points;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.photo = "";
      state.accessToken = "";
      // localStorage.removeItem("token");
      state.apiToken = "";
      state.name = "";
      state.refreshToken = "";
      state.email = "";
      state.uid = "";
      state.refCode = "";
      state.points = 0;
    },
  },
});

export const authActions = authSlice.actions;
export const authName = authSlice.name;

export const selectisLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectphoto = (state: RootState) => state.auth.photo;
export const selectaccessToken = (state: RootState) => state.auth.accessToken;
export const selectname = (state: RootState) => state.auth.name;
export const selectrefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectemail = (state: RootState) => state.auth.email;
export const selectuid = (state: RootState) => state.auth.uid;
export const selectApiToken = (state: RootState) => state.auth.apiToken;

export default authSlice;
