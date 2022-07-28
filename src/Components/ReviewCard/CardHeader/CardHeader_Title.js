import { useTheme } from "@emotion/react";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ROUTES_NAMES from "../../../RoutesNames";

const CardHeaderTitle = ({
  userName,
  productName,
  userProfilePath,
  targetProfilePath,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* user name */}
        <Link
          style={{
            textDecoration: "none",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            textAlign: "center",
            direction: theme.direction,
            maxWidth: "50%",
          }}
          to={userProfilePath}
        >
          <Typography
            sx={{
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
            variant="S16W700C050505"
          >
            {userName}
          </Typography>
        </Link>
        {/* product name and arrow */}
        {productName && (
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
        )}
        <Link
          style={{
            textDecoration: "none",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            textAlign: "center",
            direction: "ltr",
            maxWidth: "50%",
          }}
          to={targetProfilePath}
        >
          <Typography
            component="h1"
            variant="S16W700C050505"
            sx={{
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
          >
            {productName}
          </Typography>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default CardHeaderTitle;
