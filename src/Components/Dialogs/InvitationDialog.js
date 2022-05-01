import { useTheme } from "@emotion/react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Box, TextField, Typography } from "@mui/material";
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
        <Typography variant="S16W400C050505">{paragraph}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
            margin="normal"
            inputProps={{
              style: {
                width: "27vw",
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
          {/* <StyledTextField disabled defaultValue={invitationCode} /> */}
          <ContentCopyOutlinedIcon
            sx={{ fontSize: "40px", margin: "0px 20px" }}
          />
        </Box>
        <OrangeGradientButton color="red">
          <ShareOutlinedIcon sx={{ fontSize: "25px" }} />
          <Typography variant="S18W700Cffffff">{shareCode}</Typography>
        </OrangeGradientButton>
      </DialogTemplate>
    </React.Fragment>
  );
};
