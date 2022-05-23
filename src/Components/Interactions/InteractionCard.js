import React from "react";
import { Card, styled, Typography } from "@mui/material";
import { useConvertNumberToHumanLanguage } from "../../hooks/useMillify";
import { useAppSelector } from "../../store/hooks";
import { subtractDate } from "../../functions/subtractDate";

const InteractionCardStyle = styled(
  Card,
  {}
)(({ theme }) => ({
  display: "flex",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    minWidth: "45vw !important", // Overrides inline-style
  },
  minWidth: "20vw",
  flexDirection: "column",
  overflow: "unset",
  padding: "5px 12px 15px 12px",
  borderRadius: "12px",
  backgroundColor: theme.palette.interactionCard.backgroundColor,
}));
const LikeCounterStyle = styled(
  Card,
  {}
)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "0px 3px 0px 3px",
  minHeight: "15px",
  minWidth: "33px",
  borderRadius: "50px",
  position: "absolute",
  alignItems: "center",
  bottom: "-3px",
  right: "-10px",
}));

export const InteractionCard = ({ user, text, likes, ownedAt, renderIcon }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const lang = useAppSelector((state) => state.language.language);

  return (
    <div>
      <InteractionCardStyle>
        <Typography variant="S14W700C050505">{user}</Typography>
        {ownedAt ? (
          <Typography variant="S12W400C65676b">
            {`${textContainer.usedThisProductFor} ${subtractDate(
              ownedAt,
              lang
            )}`}
          </Typography>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <Typography variant="S14W400C050505">{text}</Typography>
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
