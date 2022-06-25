import React, { Fragment } from "react";
import { Box, Card, styled, Typography } from "@mui/material";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { useAppSelector } from "../../store/hooks";
const BannerStyle = styled(
  Card,
  {}
)((theme) => ({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  borderRadius: "15px",
}));

export const CompetitionBanner = ({ daysLeft, prize }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionary = {};
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
          {!daysLeft && !prize && (
            <Typography variant="S22W500Cffffff">
              ساعد الاخرين لتجمع اكبر عدد من النقاط
            </Typography>
          )}
          {/* dayes left */}
          {daysLeft && (
            <Typography variant="S22W500Cffffff">
              {daysLeft + " يوم و تنتهي المسابقة"}
            </Typography>
          )}
          {/* prize */}
          {prize && (
            <Fragment>
              <Typography variant="S22W500Cffffff">{"الجائزة هي"}</Typography>
              <Typography
                variant="S22W800Cffffff"
                style={{ textDecoration: "underline" }}
              >
                {prize}
              </Typography>
            </Fragment>
          )}
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
