import { useTheme } from "@emotion/react";
import { Avatar, Card, Typography, TextField, Box } from "@mui/material";
import React from "react";
import {
  CARD_BORDER_RADIUS,
  SEARCH_INPUT_BORDER_RADIUS,
} from "../../constants";
import { useAppSelector } from "../../store/hooks";
import { FixedGrid } from "../Grid/FixedGrid";

export const PostingComponent = ({
  placeholder = "اكتب منشور",
  label = "يمكنك مراجعة أو طرح السؤال:",
}) => {
  const userProfile = useAppSelector((state) => state.auth);
  const theme = useTheme();
  /*Edit Text Field here */
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
  };
  return (
    <FixedGrid>
      <Card
        elevation={3}
        style={{
          borderRadius: `${CARD_BORDER_RADIUS}px`,
          //Just for styling
          //   minHeight: "129px",
          //   minWidth: "641px",
        }}
      >
        <div style={{ padding: "20px" }}>
          <Typography variant="S14W500C050505">{label}</Typography>
        </div>
        <Box
          sx={{
            //FlexBox
            display: "flex",
            padding: "0px 10px 28px 10px",
            input: {
              "&::placeholder": {
                opacity: 1,
                fontWeight: 300,
                fontSize: 16,
                // color: "#050505",
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
          <TextField {...textFieldParams} />
        </Box>
      </Card>
    </FixedGrid>
  );
};
