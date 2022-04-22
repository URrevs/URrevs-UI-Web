import { Box, Typography, TextField } from "@mui/material";
import { Field } from "formik";

const FormikTextField = ({
  text,
  label,
  fieldName,
  isRequired = false,
  textSize = "h6",
}) => {
  return (
    <Field name={fieldName}>
      {({ field: { value }, form: { setFieldValue }, meta }) => (
        <Box sx={{ flexGrow: "1" }}>
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
              sx={{ display: "flex", pb: "10px" }}
              variant="outlined"
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
