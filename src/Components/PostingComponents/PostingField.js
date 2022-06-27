import { useTheme } from "@emotion/react";
import { Avatar, Box, TextField } from "@mui/material";
import React from "react";
import { SEARCH_INPUT_BORDER_RADIUS } from "../../constants";
import { useAppSelector } from "../../store/hooks";

export const PostingField = ({
  placeholder = "",
  params = {}, //Adding new textfield params or overwriting existing ones
  handleClick = () => {},
}) => {
  const userProfile = useAppSelector((state) => state.auth);
  const theme = useTheme();
  const textFieldParams = {
    autoComplete: "off",
    //Outer part of the TextField
    style: {
      width: "100%",
      border: "none",
    },
    variant: "standard",
    placeholder: placeholder,
    //All Text Field Styling goes here
    InputProps: {
      disableUnderline: true,
      style: {
        width: "100%",
        height: "50px",
        padding: "13px",
        ...theme.typography.S16W500C050505,
        alignContent: "center",
        background: "#f0f2f5",
        borderRadius: `${SEARCH_INPUT_BORDER_RADIUS}px`,
      },
    },
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
        <TextField {...textFieldParams} onClick={handleClick} />
      </Box>
    </div>
  );
};
