import { useTheme } from "@emotion/react";
import { FormHelperText, Stack } from "@mui/material";
import { FastField } from "formik";
import React from "react";
import { StyledTextField } from "./StyledTextField";
// const InputLabelProps={{
//   style: {
//     fontWeight: 300,
//     fontSize: 16,
//     color: theme.palette.textField.inputFieldText,
//   }, //Doesn't look any different
// }}
const FormikTextField = ({
  label,
  fieldName,
  isRequired = false,
  isControlled = false,
  multiline = true,
}) => {
  return (
    <FastField name={fieldName}>
      {({ field: { value }, form: { setFieldValue }, meta }) => (
        <React.Fragment>
          <Stack
            spacing={0}
            sx={{
              width: fieldName === "invitationCode" ? "50%" : "100%",
            }}
          >
            <StyledTextField
              multiline={multiline}
              placeholder={label}
              // required={isRequired}
              error={meta.touched && meta.error}
              value={value}
              onChange={
                isControlled
                  ? (e) => {
                      setFieldValue(fieldName, e.target.value);
                      sessionStorage.setItem(fieldName, e.target.value);
                    }
                  : () => {}
              }
              onBlur={
                isControlled
                  ? () => {}
                  : (e) => {
                      setFieldValue(fieldName, e.target.value);
                      sessionStorage.setItem(fieldName, e.target.value);
                    }
              }
            />
            {meta.touched && meta.error && (
              <FormHelperText
                error
                sx={{
                  margin: "0px 15px",
                }}
              >
                {meta.touched && meta.error}
              </FormHelperText>
            )}
          </Stack>
          {/* <div
            style={{
              margin: "50px",
            }}
          >
            <p
              style={{
                color: "#d32f2f",
                fontSize: "12px",
                fontFamily: "Tajawal",
                fontWeight: "400",
              }}
            >
              {meta.touched && meta.error}
            </p>
          </div> */}
        </React.Fragment>
      )}
    </FastField>
  );
};
export default FormikTextField;
