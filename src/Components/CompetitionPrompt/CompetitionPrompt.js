import { useTheme } from "@emotion/react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  TEXT_FIELD_BORDER_RADIUS,
  TEXT_FIELD_BORDER_THICKNESS,
} from "../../constants";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";
import { StyledDatePicker } from "../Form/StyledDatePicker";
import { StyledTextField } from "../Form/StyledTextField";
import { DatePicker } from "@mui/lab";
import { Formik } from "formik";
import FormikDatePicker from "../Form/FormikDatePicker";
import FormikTextField from "../Form/FormikTextField";

const PromptStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: "12px",
  padding: "20px 20px",
}));

export const CompetitionPrompt = ({ button, handleClose }) => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const handleInitialValues = (fieldName, empty = "") => {
    return sessionStorage.getItem(fieldName)
      ? sessionStorage.getItem(fieldName)
      : empty;
  };
  const language = useSelector((state) => state.language.language);
  useEffect(() => {}, [language]);
  const PromptValidationScheme = Yup.object().shape(
    language === "ar"
      ? {
          endDate: Yup.date().required("أختر تاريخ"),
          winners: Yup.string().required("ضروري"),
          prize: Yup.string().required("لازم"),
          imgLink: Yup.string().url("لازم لينك يا صاحبي").required("من فضلك"),
        }
      : {
          endDate: Yup.date().required("Select a Date"),
          winners: Yup.string().required("Required"),
          prize: Yup.string().required("Required"),
          imgLink: Yup.string().url("entry must be link").required("Required"),
        }
  );
  // const theme = useTheme();
  const renderFields = (text, fieldName, label, controlled = false) => {
    return (
      <React.Fragment>
        <Typography sx={{}} variant="S18W500C050505">
          {text}
        </Typography>
        <FormikTextField
          fieldName={fieldName}
          label={label}
          isControlled={controlled}
        />
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          endDate: handleInitialValues("endDate", ""),
          winners: handleInitialValues("winners", ""),
          prize: handleInitialValues("prize", ""),
          imgLink: handleInitialValues("imgLink", ""),
        }}
        validationSchema={PromptValidationScheme}
        onSubmit={(values, { setSubmitting }) => {
          sessionStorage.clear();
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <PromptStyled>
            <form onSubmit={handleSubmit}>
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
                  <Typography variant="S16W700C050505">
                    {textContainer.addingCompetition}
                  </Typography>
                  <IconButton
                    onClick={handleClose}
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
                  <FormikDatePicker
                    isRequired={false}
                    label={textContainer.competitionEndDate}
                    fieldName={"endDate"}
                  />
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
                    "winners",
                    textContainer.winnersNumber
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

                    "prize",

                    textContainer.prizeName
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
                    "imgLink",
                    textContainer.prizeImageLink,
                    true
                  )}
                </div>
                <img
                  alt=""
                  src={values.imgLink}
                  style={{
                    maxWidth: "60vw",
                    alignSelf: "center",
                    margin: "10px 0px",
                  }}
                />

                <OrangeGradientButton
                  type="submit"
                  disabled={isSubmitting}
                  color="red"
                  // startIcon={<AddOutlinedIcon sx={{ fontSize: "28px" }} />} not used because size is not applied
                >
                  <AddOutlinedIcon sx={{ fontSize: "28px" }} />
                  <Typography variant="S18W700Cffffff"> {button}</Typography>
                </OrangeGradientButton>
              </Box>
            </form>
          </PromptStyled>
        )}
      </Formik>
    </React.Fragment>
  );
};
