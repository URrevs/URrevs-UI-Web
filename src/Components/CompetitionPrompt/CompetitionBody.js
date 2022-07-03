import { useTheme } from "@emotion/react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";
import FormikDatePicker from "../Form/DatePicker/FormikDatePicker";
import FormikTextField from "../Form/FormikTextField";
import { useAddCompetetionMutation } from "../../services/competetion";
import { useAppDispatch } from "../../store/hooks";
import { snackbarActions } from "../../store/uiSnackbarSlice";
import { FormSubmitButton } from "../../pages/PostingScreen/FormSubmitButton";
import FormikDateTimePicker from "../Form/DatePicker/FormikDateTimePicker";

export const CompetitionBody = ({ button, handleClose }) => {
  const [addCompetitionRequest] = useAddCompetetionMutation();

  const textContainer = useSelector((state) => state.language.textContainer);
  const handleInitialValues = (fieldName, empty = "") => {
    return sessionStorage.getItem(fieldName)
      ? sessionStorage.getItem(fieldName)
      : empty;
  };
  const theme = useTheme();
  const language = useSelector((state) => state.language.language);
  useEffect(() => {}, [language]);
  const PromptValidationScheme = Yup.object().shape({
    endDate: Yup.date().required(textContainer.competitionEndDateErrorMsg),
    winners: Yup.number()
      .required(textContainer.enterNumberOfWinnersErrorMsg)
      .positive(textContainer.enterNumberOfWinnersErrorMsg)
      .typeError(textContainer.enterNumberOfWinnersErrorMsg),
    prize: Yup.string().required(textContainer.AddPrizeNameErrorMsg),
    imgLink: Yup.string().required(textContainer.prizeImageUrlErrorMsg),
  });
  // const theme = useTheme();
  const renderFields = (text, fieldName, label, controlled = true) => {
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
  const dispatch = useAppDispatch();
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          endDate: "",
          winners: "",
          prize: "",
          imgLink: "",
        }}
        validationSchema={PromptValidationScheme}
        onSubmit={async (values, { setSubmitting }) => {
          sessionStorage.clear();
          // add competetion request
          try {
            await addCompetitionRequest({
              deadline: new Date(values.endDate),
              numWinners: parseInt(values.winners),
              prize: values.prize,
              prizePic: values.imgLink,
            }).unwrap();
            dispatch(
              snackbarActions.showSnackbar({ message: "Competition added" })
            );
          } catch (e) {
            dispatch(snackbarActions.showSnackbar({ message: e.data.status }));
          }
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
                <FormikDateTimePicker
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
              <FormSubmitButton
                submitLabel={textContainer.addCompetition}
                loading={isSubmitting}
              />
            </Box>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};
