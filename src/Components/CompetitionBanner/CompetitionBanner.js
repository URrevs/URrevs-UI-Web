import React from "react";
import { Box, Card, styled, Typography } from "@mui/material";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
const BannerStyle = styled(
  Card,
  {}
)((theme) => ({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  borderRadius: "15px",
}));
export const CompetitionBanner = (props) => {
  return (
    <React.Fragment>
      <BannerStyle elevation={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: "21px",
          }}
        >
          <Typography variant="S22W800Cffffff">
            {props.daysLeft + ` يوم و تنتهي المسابقة `}
          </Typography>
          <Typography variant="S22W800Cffffff">{"الجائزة هي"}</Typography>
          <Typography
            variant="S22W800Cffffff"
            style={{ textDecoration: "underline" }}
          >
            {props.prize}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 22px",
          }}
        >
          <OrangeGradientButton color="red">
            <HelpRoundedIcon sx={{ mr: "3px" }} />
            <Typography variant="S14W700CFFFFFF">كيف تربح</Typography>
          </OrangeGradientButton>
          <OrangeGradientButton color="red">
            <GroupsOutlinedIcon sx={{ mr: "3px" }} />
            <Typography variant="S14W700CFFFFFF">ادعُ أصدقائك</Typography>
          </OrangeGradientButton>
        </Box>
      </BannerStyle>
    </React.Fragment>
  );
};
