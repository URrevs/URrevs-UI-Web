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
  const minIsoDate = new Date()
    .toISOString()
    .replace(/[0-9]+:[0-9]+:[0-9]{2}.[0-9]{3}/, "22:00:00.000");

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
              minDate={new Date(minIsoDate)}
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
                    {...params}
                    sx={{
                      ...theme.typography.S16W300C050505,
                      input: {
                        "&::placeholder": {
                          ...theme.typography.S16W300C050505,
                          opacity: 1,
                        },
                      },
                    }}
                    inputProps={{
                      ...params.inputProps,
                      style: {
                        ...theme.typography.S16W500C050505,
                      },
                      placeholder: label,
                    }}
                    onKeyDown={(e) => {
                      e.preventDefault();
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
