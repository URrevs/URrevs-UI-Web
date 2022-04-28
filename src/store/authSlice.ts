import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface AuthState {
  isLoggedIn: boolean;
  photo: string;
  accessToken: string;
  name: string;
  refreshToken: string;
  email: string;
  uid: string;
}

const initialAuthState: AuthState = {
  isLoggedIn: false,
  photo: "",
  accessToken: "",
  name: "",
  refreshToken: "",
  email: "",
  uid: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = true;
      state.photo = action.payload.photo;
      state.accessToken = action.payload.accessToken;
      state.name = action.payload.name;
      state.refreshToken = action.payload.refreshToken;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      // console.log(state.accessToken);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.photo = "";
      state.accessToken = "";
      state.name = "";
      state.refreshToken = "";
      state.email = "";
      state.uid = "";
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

export default authSlice;
