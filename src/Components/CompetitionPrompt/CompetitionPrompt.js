import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import { Box, Card, styled, TextField, Typography } from "@mui/material";
import React from "react";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";
import { useTheme } from "@emotion/react";
import {
  TEXT_FIELD_BORDER_RADIUS,
  TEXT_FIELD_BORDER_THICKNESS,
} from "../../constants";

const PromptStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: "12px",
  marginRight: "20px", //just for testing
}));

export const CompetitionPrompt = ({ text, button, imgSrc }) => {
  const theme = useTheme();
  const renderFields = (text, label) => {
    return (
      <React.Fragment>
        <Typography sx={{}} variant="S18W500C050505">
          {text}
        </Typography>
        <TextField
          sx={
            {
              // pb: "10px",
            }
          }
          inputProps={{
            style: {
              fontWeight: 300,
              fontSize: 16,
              color: "#050505",
              background: theme.palette.textField.inputFieldBackground,
              borderRadius: TEXT_FIELD_BORDER_RADIUS,
              border: `${TEXT_FIELD_BORDER_THICKNESS}px solid ${theme.palette.textField.borderColor}`,
            },
          }}
          InputLabelProps={{
            style: { fontWeight: 300, fontSize: 16, color: "#050505" }, //Doesn't look any different
          }}
          label={label}
        />
      </React.Fragment>
    );
  };
  const array = [
    { q: text.q2, l: text.l2 },
    { q: text.q3, l: text.l3 },
    { q: text.q4, l: text.l4 },
  ];
  return (
    <React.Fragment>
      <Box
        sx={{
          // padding: "28px 40px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <IconButton sx={{ alignSelf: "end" }}>
            <CancelIcon
              sx={{
                fill: "#E8E8E8",
                // filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))",
              }}
              fontSize="large"
            />
          </IconButton> */}

        <Typography variant="S16W700C050505"> اضافة مسابقة</Typography>

        {array.map((field) => {
          return renderFields(field.q, field.l);
        })}

        <img
          alt=""
          src={imgSrc}
          style={{
            alignSelf: "center",
            margin: "10px 0px",
            height: "120px",
            width: "auto",
          }}
        />

        <OrangeGradientButton
          color="red"
          // startIcon={<AddOutlinedIcon sx={{ fontSize: "28px" }} />} not used because size is not applied
        >
          <AddOutlinedIcon sx={{ fontSize: "28px" }} />
          <Typography variant="S18W700Cffffff"> {button}</Typography>
        </OrangeGradientButton>
      </Box>
    </React.Fragment>
  );
};
