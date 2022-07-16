import React from "react";
import { Card, styled, Typography } from "@mui/material";
import { useConvertNumberToHumanLanguage } from "../../hooks/useMillify";
import { useAppSelector } from "../../store/hooks";
import { subtractDate } from "../../functions/subtractDate";
import { Link } from "react-router-dom";
import ROUTES_NAMES from "../../RoutesNames";

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
  backgroundColor: theme.isMobile
    ? theme.palette.interactionCard.backgroundMobileColor
    : theme.palette.interactionCard.backgroundColor,
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
  backgroundColor: theme.isMobile
    ? theme.palette.interactionCard.backgroundMobileColor
    : theme.palette.interactionCard.backgroundColor,
  borderRadius: "50px",
  position: "absolute",
  alignItems: "center",
  bottom: "-3px",
  right: "-10px",
}));

export const InteractionCard = ({
  text,
  likes,
  ownedAt,
  renderIcon,
  userName,
  userId,
}) => {
  const [cropTextLength, setCropTextLength] = React.useState(300);

  const textContainer = useAppSelector((state) => state.language.textContainer);
  const lang = useAppSelector((state) => state.language.language);

  // const numberOfNewLines = 6;
  // const getIndexOfNewLines = (text) => {
  //   let index = text.indexOf("\n");
  //   for (let i = 0; i < numberOfNewLines - 1; ++i) {
  //     index = text.indexOf("\n", index + 1);
  //   }
  //   return index;
  // };

  //See more function
  const handleText = (text) => {
    // const newlines = text.split("\n");
    // if (newlines.length > numberOfNewLines)
    //   return `${text.slice(0, numberOfNewLines)} ${
    //     cropTextLength !== 300 ? "" : "..."
    //   }`;
    if (text.length > 300)
      return `${text.slice(0, cropTextLength)} ${
        cropTextLength === 300 ? "... " : ""
      }`;
    else return text;
  };

  return (
    <div>
      <InteractionCardStyle>
        <Link
          style={{ textDecoration: "none" }}
          to={`../../${ROUTES_NAMES.USER_PROFILE}?userId=${userId}`}
        >
          <Typography
            sx={{
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
            variant="S14W700C050505"
          >
            {userName}
          </Typography>
        </Link>
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
        <Typography variant="S14W400C050505">
          {handleText(text)}
          {text.length > 300 && text.length !== cropTextLength && (
            <Typography
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                setCropTextLength(text.length);
              }}
              variant="S18W800C050505"
            >
              {textContainer.seeMore}
            </Typography>
          )}
        </Typography>

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
