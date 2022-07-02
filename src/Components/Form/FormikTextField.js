import { useTheme } from "@emotion/react";
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
          <StyledTextField
            multiline={multiline}
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
