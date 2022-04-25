import { useTheme } from "@emotion/react";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import Typography from "@mui/material/Typography";
import * as React from "react";

const CardHeaderTitle = ({ userName, productName }) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            textAlign: "center",
            direction: "rtl",
            maxWidth: "50%",
          }}
          variant="S16W700C050505"
        >
          {userName}
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {theme.direction === "rtl" ? (
            <ArrowLeftRoundedIcon
              htmlColor={theme.palette.reviewCard.reviewArrow}
              sx={{ fontSize: 30 }}
            />
          ) : (
            <ArrowRightRoundedIcon
              htmlColor={theme.palette.reviewCard.reviewArrow}
              sx={{ fontSize: 30 }}
            />
          )}
        </div>
        <Typography
          variant="S16W700C050505"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            textAlign: "center",
            direction: "rtl",
            maxWidth: "50%",
          }}
        >
          {productName}
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default CardHeaderTitle;
