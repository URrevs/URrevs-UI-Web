import { useTheme } from "@emotion/react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { languageActions } from "../../store/languageSlice";
import { DialogTemplate } from "./DialogTemplate";

export const LanguageDialog = ({ handleClose }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const language = theme.direction === "rtl" ? "arabic" : "english";
  return (
    <React.Fragment>
      <div
        style={{
          direction: theme.direction,
        }}
      >
        <DialogTemplate
          handleClose={handleClose}
          title={textContainer.language}
        >
          <FormControl>
            <RadioGroup value={language}>
              <FormControlLabel
                value={"arabic"}
                onChange={() => {
                  dispatch(languageActions.switchLanguage({ language: "ar" }));
                }}
                control={<Radio />}
                label={textContainer.arabic}
              />
              <FormControlLabel
                value="english"
                onChange={() => {
                  dispatch(languageActions.switchLanguage({ language: "en" }));
                }}
                control={<Radio />}
                label={textContainer.english}
              />
            </RadioGroup>
          </FormControl>
        </DialogTemplate>
      </div>
    </React.Fragment>
  );
};
