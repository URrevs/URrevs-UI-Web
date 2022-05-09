import { useTheme } from "@emotion/react";
import { Box, Typography, TextField } from "@mui/material";
import { Field } from "formik";
import React from "react";
import {
  TEXT_FIELD_BORDER_RADIUS,
  TEXT_FIELD_BORDER_THICKNESS,
} from "../../constants";
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
}) => {
  const theme = useTheme();
  return (
    <Field name={fieldName}>
      {({ field: { value }, form: { setFieldValue }, meta }) => (
        <React.Fragment>
          <StyledTextField
            defaultValue={""}
            placeholder={label}
            // required={isRequired}
            error={meta.touched && meta.error && true}
            helperText={meta.touched && meta.error}
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
          {/* <TextField
            // sx={{ display: "flex", pb: "10px" }}
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
            defaultValue={sessionStorage.getItem(fieldName)}
            placeholder={label}
            multiline
            required={isRequired}
            error={meta.touched && meta.error && true}
            helperText={meta.touched && meta.error}
            onBlur={(e) => {
              setFieldValue(fieldName, e.target.value);
              sessionStorage.setItem(fieldName, e.target.value);
            }}
          /> */}
        </React.Fragment>
      )}
    </Field>
  );
};
export default FormikTextField;
