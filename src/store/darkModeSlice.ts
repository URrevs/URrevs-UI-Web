import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface DarkState {
  isDark: boolean;
}

const initialDarkState: DarkState = {
  isDark: localStorage.getItem("isDark") === "true" ? true : false,
};

const isDarkSlice = createSlice({
  name: "darkMode",
  initialState: initialDarkState,
  reducers: {
    switchMode: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem("isDark", state.isDark.toString());
    },
    changeMode: (state, actions) => {
      state.isDark = actions.payload;
      localStorage.setItem("isDark", state.isDark.toString());
    },
  },
});

export const isDarkActions = isDarkSlice.actions;
export const isDarkSliceName = isDarkSlice.name;
export const selectDark = (state: RootState) => state.darkMode.isDark;

export default isDarkSlice;
