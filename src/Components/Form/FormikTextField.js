import { useTheme } from "@emotion/react";
import { Box, Typography, TextField } from "@mui/material";
import { Field } from "formik";
import {
  TEXT_FIELD_BORDER_RADIUS,
  TEXT_FIELD_BORDER_THICKNESS,
} from "../../constants";

const FormikTextField = ({
  text,
  label,
  fieldName,
  isRequired = false,
  textSize = "h6",
}) => {
  const theme = useTheme();
  return (
    <Field name={fieldName}>
      {({ field: { value }, form: { setFieldValue }, meta }) => (
        <Box>
          <Typography variant={textSize} sx={{ pb: "5px" }}>
            {text}
          </Typography>
          {/*     <input
            label={label}
            onBlur={(e) => {
              setFieldValue(fieldName, e.target.value);
            }}
          />*/}
          {
            <TextField
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
              label={label}
              multiline
              required={isRequired}
              error={meta.touched && meta.error && true}
              helperText={meta.touched && meta.error}
              onBlur={(e) => {
                setFieldValue(fieldName, e.target.value);
                sessionStorage.setItem(fieldName, e.target.value);
              }}
            />
          }
        </Box>
      )}
    </Field>
  );
};
export default FormikTextField;
