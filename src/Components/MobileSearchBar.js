import { useTheme } from "@emotion/react";
import { Search } from "@mui/icons-material";
import { InputBase, TextField } from "@mui/material";
import { styled } from "@mui/styles";
import React, { Fragment } from "react";
import {
  TEXT_FIELD_BORDER_RADIUS,
  TEXT_FIELD_BORDER_THICKNESS,
} from "../constants";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create("width"),
    // width: "100%",
  },
}));
export const MobileSearchBar = () => {
  const theme = useTheme();
  return (
    <Fragment>
      <TextField
        disabled
        inputProps={{
          style: {
            width: "27vw",
            fontWeight: 500,
            fontSize: 22,
            textAlign: "center",
            WebkitTextFillColor: theme.palette.textField.inputFieldText,
            background: theme.palette.textField.inputFieldBackground,
            borderRadius: TEXT_FIELD_BORDER_RADIUS,
            border: `${TEXT_FIELD_BORDER_THICKNESS}px solid ${theme.palette.textField.borderColor}`,
          },
        }}
      ></TextField>
    </Fragment>
  );
};
