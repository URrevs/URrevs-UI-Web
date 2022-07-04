import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import FormikTextField from "../Form/FormikTextField";
import { DialogTemplate } from "./DialogTemplate";

export const SendReports = ({ handleClose = () => {} }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const fieldNames = {
    radioGroup: "radio group",
    additionalInfoTxtField: "additional info textfield",
  };
  const radioValues = {
    option1: "spam",
    option2: "violent content",
    option3: "harassment",
    option4: "nudity",
    option5: "hate content",
    option6: "other",
  };
  const pageDictionary = {
    title: textContainer.report,
    subTitle: textContainer.selectTheReasonForTheComplaint,
    option1: textContainer.spam,
    option2: textContainer.violentContent,
    option3: textContainer.harassment,
    option4: textContainer.nudity,
    option5: textContainer.hateContent,
    option6: textContainer.other,
    additionalInfoTxtFieldLabel:
      textContainer.enterAdditionalInformationRegardingTheComplaint,
    send: textContainer.send,
    cancel: textContainer.cancel,
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
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Stack
                spacing={2}
                style={{ display: "flex", flexDirection: "column" }}
              >
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
                      sx={{
                        fontWeight: "500",
                        fontSize: "50px",
                      }}
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
