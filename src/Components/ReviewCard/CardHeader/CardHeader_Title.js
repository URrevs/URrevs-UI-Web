import { useTheme } from "@emotion/react";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
        <Typography
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            textAlign: "center",
            direction: "rtl",
            maxWidth: "50%",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
          variant="S16W700C050505"
          onClick={() => navigate(userProfilePath)}
        >
          {userName}
        </Typography>
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
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
          onClick={() => navigate(targetProfilePath)}
        >
          {productName}
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default CardHeaderTitle;
