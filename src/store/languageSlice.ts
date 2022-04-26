import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { text } from "../Dictionary";
import Dictionary from "../Dictionary";

interface LanguageState {
  language: string;
  textContainer: Dictionary;
}

const initialLanguageState: LanguageState = {
  language: localStorage.getItem("language") ?? "en",
  textContainer: localStorage.getItem("language") === "ar" ? text.ar : text.en,
};

const languageSlice = createSlice({
  name: "language",
  initialState: initialLanguageState,
  reducers: {
    switchLanguage(state, actions: PayloadAction<LanguageState>) {
      state.language = actions.payload.language;
      state.textContainer = state.language === "ar" ? text.ar : text.en;
      localStorage.setItem("language", state.language);
    },
  },
});

export const languageActions = languageSlice.actions;
export const languageSliceName = languageSlice.name;

export default languageSlice;
