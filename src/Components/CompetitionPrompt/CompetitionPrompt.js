import { useTheme } from "@emotion/react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import AccessibleIcon from "@mui/icons-material/Accessible";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { arEG, enUS } from "date-fns/locale";
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TEXT_FIELD_BORDER_RADIUS,
  TEXT_FIELD_BORDER_THICKNESS,
} from "../../constants";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";
import { StyledDatePicker } from "../Form/StyledDatePicker";
import { StyledTextField } from "../Form/StyledTextField";
import { DatePicker } from "@mui/lab";

const PromptStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: "12px",
  padding: "20px 20px",
}));

export const CompetitionPrompt = ({ button }) => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const [compDate, setCompDate] = useState(null);
  const [openDate, setOpenDate] = useState(false);
  const [winners, setWinners] = useState("");
  const [prize, setPrize] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const theme = useTheme();
  const language = useSelector((state) => state.language.language);
  const localeDate = language === "ar" ? arEG : enUS;
  const renderFields = (text, label, setText) => {
    return (
      <React.Fragment>
        <Typography sx={{}} variant="S18W500C050505">
          {text}
        </Typography>
        <StyledTextField
          InputLabelProps={{
            style: {
              fontWeight: 300,
              fontSize: 16,
              color: theme.palette.textField.inputFieldText,
            }, //Doesn't look any different
          }}
          placeholder={label}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </React.Fragment>
    );
  };
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "12px 12px",
            }}
          >
            <Typography sx={{}} variant="S18W500C050505">
              {textContainer.enterCompetitionFinishingDate}
            </Typography>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={localeDate}
            >
              <MobileDatePicker
                value={compDate}
                open={openDate}
                // onOpen={() => setOpenDate(true)}
                onClose={() => setOpenDate(false)}
                onChange={(newValue) => {
                  setCompDate(newValue);
                }}
                renderInput={(params) => {
                  params.InputProps = {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setOpenDate(true)}>
                          <ArrowDropDownRoundedIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: {
                      fontWeight: 300,
                      fontSize: 16,
                      color: theme.palette.textField.inputFieldText,
                      background: theme.palette.textField.inputFieldBackground,
                      borderRadius: TEXT_FIELD_BORDER_RADIUS,
                      border: `${TEXT_FIELD_BORDER_THICKNESS}px solid ${theme.palette.textField.borderColor}`,
                    },
                  };
                  return (
                    <TextField
                      // placeholder={textContainer.competitionEndDate}
                      {...params}
                    />
                  );
                }}
              />
            </LocalizationProvider>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "12px 12px",
            }}
          >
            {renderFields(
              textContainer.enterNumberOfWinners,
              textContainer.winnersNumber,
              setWinners
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "12px 12px",
            }}
          >
            {renderFields(
              textContainer.enterPrizeName,
              textContainer.prizeName,
              setPrize
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "12px 12px",
            }}
          >
            {renderFields(
              textContainer.enterPrizeImageLink,
              textContainer.prizeImageLink,
              setImgSrc
            )}
          </div>
          <img
            alt=""
            src={imgSrc}
            style={{
              maxWidth: "60vw",
              alignSelf: "center",
              margin: "10px 0px",
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
