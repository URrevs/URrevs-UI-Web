import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  show: boolean;
  //   message: string;
  //   showActionBtn: boolean;
  //   actionBtnText: string;
  //   actionNavPath: string;
  reportAction: () => void;
}

const initialSendReportState: initialState = {
  show: false,
  //   message: "",
  //   showActionBtn: false,
  //   actionBtnText: "",
  //   actionNavPath: "",
  reportAction: () => {},
};

const sendReportSlice = createSlice({
  name: "sendReport",
  initialState: initialSendReportState,
  reducers: {
    showSendReport(state, action) {
      state.show = true;
      state.reportAction = action.payload.reportAction;
    },
    hideSendReport(state) {
      state.show = false;
    },
  },
});

export const sendReportActions = sendReportSlice.actions;
export const sendReportSliceName = sendReportSlice.name;
export default sendReportSlice;
