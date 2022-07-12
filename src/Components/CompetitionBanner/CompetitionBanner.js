import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { Box, Card, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { CARD_BORDER_RADIUS } from "../../constants";
import { subtractDate } from "../../functions/subtractDate";
import { useAppSelector } from "../../store/hooks";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";

export const CompetitionBanner = ({ daysLeft, prize, setModal }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionary = {
    helpOthersAndGetPoints: textContainer.helpOthersAndGetPoints,
    remainigDays: textContainer.remainigDays,
    thePrizeIs: textContainer.thePrizeIs,
    howToWin: textContainer.howToWin,
    inviteFriends: textContainer.inviteFriends,
    howToCollectPoints: textContainer.howToCollectPoints,
  };
  const isActive = Boolean(daysLeft && prize);
  // const isActive = Boolean(false);
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
              {subtractDate(daysLeft, "ar") + pageDictionary.remainigDays}
            </Typography>
          )}
          {/* prize */}
          {isActive && (
            <Fragment>
              <Typography variant="S22W500Cffffff">
                {pageDictionary.thePrizeIs}
              </Typography>
              <Typography
                onClick={() => {
                  setModal("prize");
                }}
                variant="S22W800Cffffff"
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {prize}
              </Typography>
            </Fragment>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            padding: "8px 22px",
          }}
        >
          <OrangeGradientButton
            color={btnGradientColor}
            onClick={() => {
              setModal("howtowin");
            }}
          >
            <HelpRoundedIcon sx={{ mr: "3px" }} />
            <Typography variant="S14W700CFFFFFF">
              {isActive
                ? pageDictionary.howToWin
                : pageDictionary.howToCollectPoints}
            </Typography>
          </OrangeGradientButton>
          <OrangeGradientButton
            color={btnGradientColor}
            onClick={() => {
              setModal("invitefriends");
            }}
          >
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
