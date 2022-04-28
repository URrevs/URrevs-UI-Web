import { useTheme } from "@emotion/react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import {
  TEXT_FIELD_BORDER_RADIUS,
  TEXT_FIELD_BORDER_THICKNESS,
} from "../../constants";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";

const PromptStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: "12px",
  padding: "20px 20px",
}));

export const CompetitionPrompt = ({ text, button, imgSrc }) => {
  text = {
    q1: "ادخل تاريخ انتهاء المسابقة:",
    l1: "تاريخ انتهاء المسابقة ",
    q2: "ادخل عدد الفائزين:",
    l2: "عدد الفائزين",
    q3: "ادخل اسم الجائزة:",
    l3: "اسم الجائزة",
    q4: "ادخل رابط صورة للجائزة:",
    l4: "رابط صورة الجائزة",
  };

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
              color: theme.palette.textField.inputFieldText,
              background: theme.palette.textField.inputFieldBackground,
              borderRadius: TEXT_FIELD_BORDER_RADIUS,
              border: `${TEXT_FIELD_BORDER_THICKNESS}px solid ${theme.palette.textField.borderColor}`,
            },
          }}
          InputLabelProps={{
            style: {
              fontWeight: 300,
              fontSize: 16,
              color: theme.palette.textField.inputFieldText,
            }, //Doesn't look any different
          }}
          label={label}
        />
      </React.Fragment>
    );
  };
  const array = [
    { q: text.q1, l: text.l1 },
    { q: text.q2, l: text.l2 },
    { q: text.q3, l: text.l3 },
    { q: text.q4, l: text.l4 },
  ];
  return (
    <React.Fragment>
      <PromptStyled>
        <Box
          sx={{
            // padding: "28px 40px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="S16W700C050505"> اضافة مسابقة</Typography>
            <IconButton
              sx={{
                border: "1px solid #050505",
                padding: 0,
                margin: 0,
                backgroundColor: "#E8E8E8",
              }}
            >
              <CloseIcon htmlColor="#000" fontSize="medium" />
            </IconButton>
          </Box>
          {array.map((field) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "12px 12px",
                }}
              >
                {renderFields(field.q, field.l)}
              </div>
            );
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
      </PromptStyled>
    </React.Fragment>
  );
};
