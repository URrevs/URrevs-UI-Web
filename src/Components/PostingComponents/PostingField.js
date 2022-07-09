import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import { SEARCH_INPUT_BORDER_RADIUS } from "../../constants";
import { useAppSelector } from "../../store/hooks";
import SendIcon from "@mui/icons-material/Send";
import { useCheckSignedIn } from "../../hooks/useCheckSignedIn";

export const PostingField = ({
  placeholder = "",
  comment = false,
  avatar = true,
  onSubmit = () => {},
  params = {}, //Adding new textfield params or overwriting existing ones
  reply = false,
}) => {
  const userProfile = useAppSelector((state) => state.auth);

  const checkIsLoggedIn = useCheckSignedIn();

  const submitComment = () => {
    if (checkIsLoggedIn()) {
      if (value.trim() !== "") {
        onSubmit(value);
        setValue("");
      }
    }
  };

  const [value, setValue] = React.useState("");
  const theme = useTheme();
  const textFieldParams = {
    multiline: true,
    // maxRows: 3,
    variant: "standard",
    InputProps: {
      endAdornment: theme.isMobile && (
        <InputAdornment sx={{ position: "relative" }} position="end">
          <IconButton
            sx={{
              // position: "absolute",
              bottom: 0,
            }}
            onClick={() => submitComment()}
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
        padding: reply ? "5px 13px 5px 13px" : "13px",
        "&::placeholder": {
          color: "#000",
        },
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
    <div
      style={{
        marginTop: "10px",
        marginLeft: 0,
        marginRight: reply ? "50px" : "0",
      }}
    >
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
              height: reply ? "32px" : `45px`,
              width: reply ? "32px" : `45px`,
              transition: "0.1s",
            }}
          />
        )}

        <TextField
          {...textFieldParams}
          value={value}
          onKeyDown={(e) => {
            if (e.code === "Enter" && !e.shiftKey) {
              submitComment();
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Box>
    </div>
  );
};
