import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import { SEARCH_INPUT_BORDER_RADIUS } from "../../constants";
import { useAppSelector } from "../../store/hooks";

export const PostingField = ({
  placeholder = "",
  avatar = true,
  onSubmit = () => {},
  params = {}, //Adding new textfield params or overwriting existing ones
}) => {
  const userProfile = useAppSelector((state) => state.auth);
  const [value, setValue] = React.useState("");
  const theme = useTheme();
  const textFieldParams = {
    multiline: true,
    maxRows: 3,
    variant: "standard",
    InputProps: {
      endAdornment: theme.isMobile && (
        <InputAdornment position="end">
          <IconButton
            onClick={() => {
              onSubmit(value);
              setValue("");
            }}
          >
            <SendIcon
              fontSize={"30px"}
              htmlColor={theme.palette.sendIconColor}
              sx={{
                transform: theme.direction === "rtl" ? "scale(-1,1)" : "",
              }}
            />
          </IconButton>
        </InputAdornment>
      ),
      disableUnderline: true,
      style: {
        width: "100%",
        padding: "13px",
        ...theme.typography.S16W500C050505,
        alignContent: "center",
        background: theme.palette.textField.postingFieldBackground,
        borderRadius: `${SEARCH_INPUT_BORDER_RADIUS}px`,
      },
    },
    autoComplete: "off",
    fullWidth: true,
    disabled: false,

    //Outer part of the TextField
    sx: {
      ".Mui-disabled": {
        //Change Disabled CSS
        cursor: "pointer",
        WebkitTextFillColor: "black !important",
      },
      transition: "all 0.2s ease",
      // width: "100%",
      border: "1px solid transparent",
    },

    placeholder: placeholder,
    //All Text Field Styling goes here

    ...params,
  };
  return (
    <div>
      <Box
        sx={{
          //FlexBox
          display: "flex",
          input: {
            "&::placeholder": {
              opacity: 1,
              ...theme.typography.S16W300C050505,
            },
          },
        }}
      >
        {!theme.isMobile && avatar && (
          <Avatar
            src={userProfile.photo}
            alt="User profile picture"
            sx={{
              mr: "8px",
              height: `45px`,
              width: `45px`,
              transition: "0.1s",
            }}
          />
        )}

        <TextField
          {...textFieldParams}
          value={value}
          onKeyDown={(e) => {
            if (e.code === "Enter" && !e.shiftKey) {
              onSubmit(value);
              setValue("");
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            setValue(e.target.value);
            // console.log(value);
          }}
        />
      </Box>
    </div>
  );
};
