import { useTheme } from "@emotion/react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { isDarkActions } from "../../store/darkModeSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { DialogTemplate } from "./DialogTemplate";

export const ThemeDialog = ({ handleClose }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const mode = useAppSelector((state) => state.darkMode.theme);

  //Talk to fady about it first
  //   if (
  //     window.matchMedia &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches
  //   ) {
  //     // dark mode
  //   }
  return (
    <React.Fragment>
      <div
        style={{
          direction: theme.direction,
        }}
      >
        <DialogTemplate handleClose={handleClose} title={textContainer.theme}>
          <FormControl>
            <RadioGroup value={mode}>
              <FormControlLabel
                value={"light"}
                onChange={() => {
                  dispatch(isDarkActions.changeMode("light"));
                }}
                control={<Radio />}
                label={textContainer.lightTheme}
              />
              <FormControlLabel
                value="dark"
                onChange={() => {
                  dispatch(isDarkActions.changeMode("dark"));
                }}
                control={<Radio />}
                label={textContainer.darkTheme}
              />
              {/* <FormControlLabel
                value="system"
                onChange={() => {
                  dispatch(isDarkActions.changeMode("system"));
                }}
                control={<Radio />}
                label={textContainer.systemTheme}
              /> */}
            </RadioGroup>
          </FormControl>
        </DialogTemplate>
      </div>
    </React.Fragment>
  );
};
