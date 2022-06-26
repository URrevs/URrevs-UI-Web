import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { arEG, enUS } from "date-fns/locale";
import { useSelector } from "react-redux";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Field } from "formik";
import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  TEXT_FIELD_BORDER_RADIUS,
  TEXT_FIELD_BORDER_THICKNESS,
} from "../../constants";

const FormikDatePicker = ({
  label,
  fieldName,
  isRequired = true,
  noFutureDate = true,
}) => {
  const [openDate, setOpenDate] = useState(false);
  const theme = useTheme();
  const language = useSelector((state) => state.language.language);
  const textContainer = useSelector((state) => state.language.textContainer);
  const purchaseDateErrorMsg = textContainer.purchaseDateErrorMsg;
  const localeDate = language === "ar" ? arEG : enUS;
  return (
    <Field name={fieldName}>
      {({ field: { value }, form: { setFieldValue }, meta }) => (
        <React.Fragment>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            locale={localeDate}
          >
            <MobileDatePicker
              maxDate={noFutureDate ? new Date() : null}
              value={value}
              views={["year", "month"]}
              onChange={(newValue) => {
                setFieldValue(fieldName, newValue);
                if (newValue) sessionStorage.setItem(fieldName, newValue);
              }}
              open={openDate}
              onOpen={() => setOpenDate(true)}
              onClose={() => setOpenDate(false)}
              renderInput={(params) => {
                params.InputProps = {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setOpenDate(true)}>
                        <ArrowDropDownRoundedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    fontWeight: 300,
                    fontSize: 16,

                    color: theme.palette.textField.inputFieldText,
                    background: theme.palette.textField.inputFieldBackground,
                    borderRadius: TEXT_FIELD_BORDER_RADIUS,
                    border: `${TEXT_FIELD_BORDER_THICKNESS}px solid ${theme.palette.textField.borderColor}`,
                  },
                };
                return (
                  <TextField
                    sx={{
                      input: {
                        "&::placeholder": {
                          opacity: 1,
                        },
                      },
                    }}
                    placeholder={label}
                    {...params}
                    error={meta.touched && meta.error && true}
                    helperText={
                      meta.touched && meta.error && purchaseDateErrorMsg
                    }
                  />
                );
              }}
            />
          </LocalizationProvider>
        </React.Fragment>
      )}
    </Field>
  );
};
export default FormikDatePicker;
