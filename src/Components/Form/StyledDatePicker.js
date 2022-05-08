import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React from "react";

export const StyledDatePicker = (props) => {
  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker {...props} />
      </LocalizationProvider>
    </React.Fragment>
  );
};
