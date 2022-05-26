import { useTheme } from "@emotion/react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";
import FormikDatePicker from "../Form/FormikDatePicker";
import FormikTextField from "../Form/FormikTextField";

export const CompetitionBody = ({ button, handleClose }) => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const handleInitialValues = (fieldName, empty = "") => {
    return sessionStorage.getItem(fieldName)
      ? sessionStorage.getItem(fieldName)
      : empty;
  };
  const theme = useTheme();
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
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                // padding: "28px 40px",
                display: "flex",
                flexDirection: "column",
              }}
            >
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
                  maxWidth: theme.isMobile ? "50%" : "100%",
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
                <Typography variant="S18W700Cffffff">
                  {textContainer.addCompetition}
                </Typography>
                <AddOutlinedIcon sx={{ fontSize: "28px" }} />
              </OrangeGradientButton>
            </Box>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};