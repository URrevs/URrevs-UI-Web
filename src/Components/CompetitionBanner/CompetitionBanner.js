import React, { Fragment } from "react";
import { Box, Card, styled, Typography } from "@mui/material";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { useAppSelector } from "../../store/hooks";
import { CARD_BORDER_RADIUS } from "../../constants";
import { subtractDate } from "../../functions/subtractDate";

export const CompetitionBanner = ({ daysLeft, prize }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionary = {
    helpOthersAndGetPoints: textContainer.helpOthersAndGetPoints,
    remainigDays: textContainer.remainigDays,
    thePrizeIs: textContainer.thePrizeIs,
    howToWin: textContainer.howToWin,
    inviteFriends: textContainer.inviteFriends,
  };
  const isActive = Boolean(daysLeft && prize);
  // const isActive = Boolean(true);
  const btnGradientColor = isActive ? "red" : "blue";
  const cardGradientColor = isActive
    ? "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
    : "#FFF";
  return (
    <React.Fragment>
      <Card
        sx={{
          background: cardGradientColor,
          minHeight: "154px",
          // minWidth: "382px",
          borderRadius: `${CARD_BORDER_RADIUS}px`,
        }}
        elevation={3}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            textAlign: "center",

            padding: "21px 80px 0px 80px",
          }}
        >
          {!isActive && (
            <Typography variant="S22W500C050505">
              {pageDictionary.helpOthersAndGetPoints}
            </Typography>
          )}
          {/* dayes left */}
          {isActive && (
            <Typography variant="S22W500Cffffff">
              {subtractDate(daysLeft, "ar") + " وتنتهي المسابقة"}
            </Typography>
          )}
          {/* prize */}
          {isActive && (
            <Fragment>
              <Typography variant="S22W500Cffffff">
                {pageDictionary.thePrizeIs}
              </Typography>
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
          <OrangeGradientButton color={btnGradientColor}>
            <HelpRoundedIcon sx={{ mr: "3px" }} />
            <Typography variant="S14W700CFFFFFF">
              {pageDictionary.howToWin}
            </Typography>
          </OrangeGradientButton>
          <OrangeGradientButton color={btnGradientColor}>
            <GroupsOutlinedIcon sx={{ mr: "3px" }} />
            <Typography variant="S14W700CFFFFFF">
              {pageDictionary.inviteFriends}
            </Typography>
          </OrangeGradientButton>
        </Box>
      </Card>
    </React.Fragment>
  );
};
