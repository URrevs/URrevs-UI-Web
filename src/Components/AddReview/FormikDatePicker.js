import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { TextField, Typography } from "@mui/material";
import { Field } from "formik";
import React from "react";

const FormikDatePicker = ({
  text,
  textSize,
  label,
  fieldName,
  isRequired = true,
}) => {
  return (
    <Field name={fieldName}>
      {({ field: { value }, form: { setFieldValue }, meta }) => (
        <>
          <Typography variant={textSize} sx={{ pb: "5px" }}>
            {text}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label={label}
              value={value}
              onChange={(newValue) => {
                setFieldValue(fieldName, newValue);
                if (newValue) sessionStorage.setItem(fieldName, newValue);
              }}
              emptyLabel="Enter Date"
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={isRequired}
                  error={meta.touched && meta.error && true}
                />
              )}
            />
            {meta.touched && meta.error && (
              <p
                style={{
                  color: "#d32f2f",
                  fontFamily: "Tajawal",
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  lineHeight: 1.66,
                  textAlign: "left",
                  marginTop: "3px",
                  marginRight: "14px",
                  marginBottom: 0,
                  marginLeft: "14px",
                }}
              >
                {meta.error}
              </p>
            )}
          </LocalizationProvider>
        </>
      )}
    </Field>
  );
};
export default FormikDatePicker;
