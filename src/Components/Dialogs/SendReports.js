import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import FormikTextField from "../Form/FormikTextField";
import { DialogTemplate } from "./DialogTemplate";

export const SendReports = ({ handleClose = () => {} }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionary = {
    title: textContainer.report,
    subTitle: textContainer.selectTheReasonForTheComplaint,
    option1: textContainer.spam,
    option2: textContainer.violentContent,
    option3: textContainer.harassment,
    option4: textContainer.nudity,
    option5: textContainer.hateContent,
    option6: textContainer.other,
    groupErrorMsg: textContainer.theReasonForTheComplaintMustBeSelectd,
    additionalInfoTxtFieldLabel:
      textContainer.enterAdditionalInformationRegardingTheComplaint,
    send: textContainer.send,
    cancel: textContainer.cancel,
  };
  const fieldNames = {
    radioGroup: "radio group",
    additionalInfoTxtField: "additional info textfield",
  };
  const formValidation = Yup.object().shape({
    [fieldNames.radioGroup]: Yup.number().min(1).max(6).required(),
    [fieldNames.additionalInfoTxtField]: Yup.string().when(
      [fieldNames.radioGroup],
      {
        is: 6,
        then: Yup.string().required(pageDictionary.additionalInfoTxtFieldLabel),
      }
    ),
  });
  const radioValues = {
    option1: 1, // Spam
    option2: 2, // Violent Content
    option3: 3, // Harassment
    option4: 4, // Nudity
    option5: 5, // Hate Content
    option6: 6, // Other
  };

  return (
    <div>
      <DialogTemplate handleClose={handleClose} title={textContainer.report}>
        <Typography>{pageDictionary.subTitle}</Typography>
        <Formik
          initialValues={{
            [fieldNames.radioGroup]: "",
            [fieldNames.additionalInfoTxtField]: "",
          }}
          validationSchema={formValidation}
          onSubmit={async (values, { setSubmitting }) => {
            const request = {
              reason: values[fieldNames.radioGroup],
              info: values[fieldNames.additionalInfoTxtField],
            };
            // alert(JSON.stringify(request));
            setSubmitting(false);
          }}
        >
          {({ values, setFieldValue, errors }) => (
            <Form>
              <Stack
                spacing={2}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* {console.log(errors)} */}
                <FormControl>
                  <RadioGroup
                    name={fieldNames.radioGroup}
                    value={values[fieldNames.radioGroup]}
                    onChange={(event) =>
                      setFieldValue(
                        fieldNames.radioGroup,
                        event.currentTarget.value
                      )
                    }
                  >
                    <FormControlLabel
                      value={radioValues.option1}
                      control={<Radio />}
                      label={pageDictionary.option1}
                    />
                    <FormControlLabel
                      value={radioValues.option2}
                      control={<Radio />}
                      label={pageDictionary.option2}
                    />
                    <FormControlLabel
                      value={radioValues.option3}
                      control={<Radio />}
                      label={pageDictionary.option3}
                    />
                    <FormControlLabel
                      value={radioValues.option4}
                      control={<Radio />}
                      label={pageDictionary.option4}
                    />
                    <FormControlLabel
                      value={radioValues.option5}
                      control={<Radio />}
                      label={pageDictionary.option5}
                    />
                    <FormControlLabel
                      value={radioValues.option6}
                      control={<Radio />}
                      label={pageDictionary.option6}
                    />
                  </RadioGroup>
                  {errors[fieldNames.radioGroup] && (
                    <FormHelperText error>
                      {pageDictionary.groupErrorMsg}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormikTextField
                  multiline
                  fieldName={fieldNames.additionalInfoTxtField}
                  label={pageDictionary.additionalInfoTxtFieldLabel}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingBottom: "12px",
                  }}
                >
                  <Button
                    variant="text"
                    sx={{
                      color: "#050505",
                    }}
                  >
                    {pageDictionary.cancel}
                  </Button>
                  <Button
                    variant="text"
                    type="submit"
                    sx={{
                      color: "#2196F3",
                    }}
                  >
                    {pageDictionary.send}
                  </Button>
                </div>
              </Stack>
            </Form>
          )}
        </Formik>
      </DialogTemplate>
    </div>
  );
};
