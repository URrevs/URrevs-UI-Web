import { useTheme } from "@emotion/react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  TEXT_FIELD_BORDER_RADIUS,
  TEXT_FIELD_BORDER_THICKNESS,
} from "../../constants";
import ROUTES_NAMES from "../../RoutesNames";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { snackbarActions } from "../../store/uiSnackbarSlice";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";
import { DialogTemplate } from "./DialogTemplate";

export const InvitationDialog = ({ handleClose }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const currentUserProfile = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const pageDictionary = {
    paragraph: textContainer.reviewEncouragement,
    title: `${textContainer.yourInvitationCode}:`,
    shareCode: textContainer.shareInvitationLink,
    codeCopyWasSuccessful: "تم نسخ كود الدعوة",
    linkCopyWasSuccessful: "تم نسخ رابط الدعوة",
  };

  const theme = useTheme();
  return (
    <React.Fragment>
      <DialogTemplate handleClose={handleClose} title={pageDictionary.title}>
        <Typography
          sx={{
            whiteSpace: "pre-line",
          }}
          variant="S16W400C050505"
        >
          {pageDictionary.paragraph}
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "13px 0px 15px 0px",
          }}
        >
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                variant="outlined"
                value={currentUserProfile.refCode}
                disabled
                // How to overwrite style by knowing className
                // sx={{
                //   "& .Mui-disabled": {
                //     WebkitTextFillColor: "green",
                //   },
                // }}
                // margin="normal"
                inputProps={{
                  style: {
                    fontWeight: 500,
                    fontSize: 22,
                    textAlign: "center",
                    WebkitTextFillColor: theme.palette.textField.inputFieldText,
                    background: theme.palette.textField.inputFieldBackground,
                    borderRadius: TEXT_FIELD_BORDER_RADIUS,
                    border: `${TEXT_FIELD_BORDER_THICKNESS}px solid ${theme.palette.textField.borderColor}`,
                  },
                }}
              />
            </Box>
            {/* <StyledTextField disabled defaultValue={invitationCode} /> */}
          </Grid>
          <Grid item xs={4}>
            {/* <ContentCopyOutlinedIcon sx={{ fontSize: "40px" }} /> */}
            <IconButton
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                verticalAlign: "center",
                color: theme.palette.blackIconColor,
              }}
              onClick={() => {
                dispatch(
                  snackbarActions.showSnackbar({
                    message: pageDictionary.codeCopyWasSuccessful,
                  })
                );
                navigator.clipboard.writeText(currentUserProfile.refCode);
              }}
            >
              <ContentCopyOutlinedIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          </Grid>
        </Grid>
        <OrangeGradientButton
          color="red"
          onClick={() => {
            dispatch(
              snackbarActions.showSnackbar({
                message: pageDictionary.linkCopyWasSuccessful,
              })
            );
            navigator.clipboard.writeText(
              `http://localhost:3000/add-review?refCode=${currentUserProfile.refCode}`
            );
          }}
        >
          <ShareOutlinedIcon sx={{ fontSize: "25px" }} />

          <Typography variant="S18W700Cffffff">
            {pageDictionary.shareCode}
          </Typography>
        </OrangeGradientButton>
      </DialogTemplate>
    </React.Fragment>
  );
};
