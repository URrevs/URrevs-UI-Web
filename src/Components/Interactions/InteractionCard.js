import React from "react";
import { Card, styled, Typography } from "@mui/material";
import { useConvertNumberToHumanLanguage } from "../../hooks/useMillify";

const InteractionCardStyle = styled(
  Card,
  {}
)(({ theme }) => ({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  overflow: "unset",
  padding: "12px 12px",
  borderRadius: "12px",
  backgroundColor: theme.palette.interactionCard.backgroundColor,
}));
const LikeCounterStyle = styled(
  Card,
  {}
)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "0px 3px",
  minHeight: "15px",
  minWidth: "33px",
  borderRadius: "50px",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  bottom: "-4px",
  right: "-15px",
}));

export const InteractionCard = ({ user, text, likes, renderIcon }) => {
  console.log(useConvertNumberToHumanLanguage(likes));
  return (
    <div>
      <InteractionCardStyle>
        <Typography variant="S14W700C050505">{user}</Typography>
        <Typography variant="S14W400C000000">{text}</Typography>
        <LikeCounterStyle>
          {renderIcon()}
          <div style={{ width: "3px" }}></div>
          <Typography variant="S14W400C050505">
            {useConvertNumberToHumanLanguage(likes)}
          </Typography>
        </LikeCounterStyle>
      </InteractionCardStyle>
    </div>
  );
};
