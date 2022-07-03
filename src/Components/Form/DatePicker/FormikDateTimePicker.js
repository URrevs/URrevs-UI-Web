import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
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
} from "../../../constants";
import { DesktopDateTimePicker } from "@mui/lab";

const FormikDateTimePicker = ({ label, fieldName }) => {
  const [openDate, setOpenDate] = useState(false);
  const theme = useTheme();
  const textContainer = useSelector((state) => state.language.textContainer);
  const competitionEndDateErrorMsg = textContainer.competitionEndDateErrorMsg;
  const localeDate = theme.direction === "rtl" ? arEG : enUS;
  return (
    <Field name={fieldName}>
      {({ field: { value }, form: { setFieldValue }, meta }) => (
        <React.Fragment>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            locale={localeDate}
          >
            <DesktopDateTimePicker
              disableHighlightToday
              minDate={new Date()}
              value={value}
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
                    autoComplete="off"
                    sx={{
                      input: {
                        "&::placeholder": {
                          opacity: 1,
                        },
                      },
                    }}
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      placeholder: label,
                    }}
                    onClick={() => setOpenDate(true)}
                    error={meta.touched && meta.error && true}
                    helperText={
                      meta.touched && meta.error && competitionEndDateErrorMsg
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
export default FormikDateTimePicker;
