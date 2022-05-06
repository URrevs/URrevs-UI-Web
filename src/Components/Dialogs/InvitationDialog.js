import { useTheme } from "@emotion/react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import {
  TEXT_FIELD_BORDER_RADIUS,
  TEXT_FIELD_BORDER_THICKNESS,
} from "../../constants";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";
import { DialogTemplate } from "./DialogTemplate";

export const InvitationDialog = ({ invitationCode = "UR1029" }) => {
  const paragraph =
    "عند قيام صديقك بنشر مراجعات علي منتجاته،\n سوف تحصل انت وصديقك علي نقاط المساعدة.";
  const title = "كود الدعوة الخاص بك:";
  const shareCode = "مشاركة رابط الدعوة";
  const theme = useTheme();
  return (
    <React.Fragment>
      <DialogTemplate title={title}>
        <Typography
          sx={{
            whiteSpace: "pre-line",
          }}
          variant="S16W400C050505"
        >
          {paragraph}
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
                value={invitationCode}
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
            <ContentCopyOutlinedIcon sx={{ fontSize: "40px" }} />
          </Grid>
        </Grid>
        <OrangeGradientButton color="red">
          <ShareOutlinedIcon sx={{ fontSize: "25px" }} />
          <Typography variant="S18W700Cffffff">{shareCode}</Typography>
        </OrangeGradientButton>
      </DialogTemplate>
    </React.Fragment>
  );
};
