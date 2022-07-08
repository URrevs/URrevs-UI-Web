import { useTheme } from "@emotion/react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { arEG, enUS } from "date-fns/locale";
import { Field } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TEXT_FIELD_BORDER_RADIUS,
  TEXT_FIELD_BORDER_THICKNESS,
} from "../../../constants";

const FormikDatePicker = ({ label, fieldName }) => {
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
            <DesktopDatePicker
              disableHighlightToday
              disableFuture
              minDate={new Date(2007, 8, 1)}
              maxDate={new Date()}
              value={value}
              views={["year", "month"]}
              onChange={(newValue) => {
                try {
                  let day = newValue.toString().replace(/[0-9]+/, "01");
                  day = day.replace(/[0-9]+:[0-9]+:[0-9]+/, "00:00:00");
                  setFieldValue(fieldName, day);
                } catch (e) {
                  // console.log(e);
                }

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
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      placeholder: label,
                    }}
                    value=""
                    onClick={() => setOpenDate(true)}
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
