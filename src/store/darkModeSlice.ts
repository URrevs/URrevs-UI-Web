import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface DarkState {
  theme: string;
  isDark: boolean;
}

const initialDarkState: DarkState = {
  theme:
    localStorage.getItem("theme") ??
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light",
  isDark: localStorage.getItem("isDark") === "true",
};

const isDarkSlice = createSlice({
  name: "darkMode",
  initialState: initialDarkState,
  reducers: {
    // switchMode: (state) => {
    //   state.isDark = !state.isDark;
    //   localStorage.setItem("isDark", state.isDark.toString());
    // },
    changeMode: (state, actions) => {
      state.theme = actions.payload;
      if (state.theme === "dark") state.isDark = true;
      else if (state.theme === "light") state.isDark = false;
      else {
        state.isDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      localStorage.setItem("isDark", state.isDark.toString());
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const isDarkActions = isDarkSlice.actions;
export const isDarkSliceName = isDarkSlice.name;
export const selectDark = (state: RootState) => state.darkMode.isDark;

export default isDarkSlice;
