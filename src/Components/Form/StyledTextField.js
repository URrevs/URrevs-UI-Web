import { useTheme } from "@emotion/react";
import { TextField } from "@mui/material";
import React from "react";
import {
  TEXT_FIELD_BORDER_RADIUS,
  TEXT_FIELD_BORDER_THICKNESS,
} from "../../constants";

export const StyledTextField = (props) => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <TextField
        autoComplete="off"
        variant="outlined"
        {...props}
        sx={{
          input: {
            "&::placeholder": {
              opacity: 1,
            },
          },
        }}
        inputProps={{
          style: {
            fontWeight: 300,
            fontSize: 16,
            color: theme.palette.textField.inputFieldText,
            background: theme.palette.textField.inputFieldBackground,
            borderRadius: TEXT_FIELD_BORDER_RADIUS,
            border: `${TEXT_FIELD_BORDER_THICKNESS}px solid ${theme.palette.textField.borderColor}`,
          },
        }}
      />
    </React.Fragment>
  );
};
