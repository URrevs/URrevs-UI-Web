import { useTheme } from "@emotion/react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { styled } from "@mui/material";
import { default as Paper } from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";

const StyledCard = styled(
  Paper,
  {}
)(({ theme }) => ({
  margin: "10px 0px",
  padding: "0",
  borderRadius: "10px",
  backgroundColor: theme.palette.reviewCard.reviewCardColor,
}));

const Card = ({ children, reviewIcon, tooltipTitle }) => {
  const theme = useTheme();
  const indicatorIconRadius = 20;

  return (
    <div style={{ position: "sticky" }}>
      <StyledCard sx={{ boxShadow: 3 }}>{children}</StyledCard>
      {/* outer */}
      <div
        style={
          reviewIcon
            ? {
                position: "absolute",
                left: theme.direction === "rtl" ? "-2px" : "auto",
                right: theme.direction === "rtl" ? "auto" : "-2px",
                top: "-4px",

                backgroundColor: theme.palette.background.default,
                // hole width
                width: `${indicatorIconRadius + 8}px`,
                height: `${indicatorIconRadius + 8}px`,
                borderRadius: "50%",

                padding: "0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }
            : {
                position: "absolute",
                left: theme.direction === "rtl" ? "-2px" : "auto",
                right: theme.direction === "rtl" ? "auto" : "-2px",
                top: "-4px",
                transform:
                  theme.direction === "rtl"
                    ? "rotate(-24deg)"
                    : "rotate(24deg)",
                backgroundColor: theme.palette.background.default,
                // hole width
                width: `${indicatorIconRadius + 4}px`,
                height: `${indicatorIconRadius + 4}px`,
                borderRadius: "50%",

                padding: "0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }
        }
      >
        {/* border */}
        <div
          style={
            reviewIcon
              ? {
                  position: "absolute",
                  left: theme.direction === "rtl" ? "2px" : "auto",
                  right: theme.direction === "rtl" ? "auto" : "2px",
                  top: "2px",
                  transform:
                    theme.direction === "rtl"
                      ? "rotate(-24deg)"
                      : "rotate(24deg)",
                  backgroundColor: theme.palette.background.default,
                  width: `${indicatorIconRadius + 2}px`,
                  height: `${indicatorIconRadius + 2}px`,
                  borderRadius: "50%",
                  border: reviewIcon
                    ? `3px solid ${theme.palette.reviewCard.indicatorColor}`
                    : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
              : {
                  position: "absolute",
                  left: theme.direction === "rtl" ? "+2px" : "auto",
                  right: theme.direction === "rtl" ? "auto" : "+2px",
                  top: "1px",

                  backgroundColor: theme.palette.background.default,
                  width: `${indicatorIconRadius + 0}px`,
                  height: `${indicatorIconRadius + 0}px`,
                  borderRadius: "50%",

                  padding: "0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
          }
        >
          {/* tooltip */}
          {reviewIcon ? (
            <Tooltip title={tooltipTitle}>
              <RateReviewOutlinedIcon
                style={{
                  color: theme.palette.reviewCard.indicatorColor,
                  borderRadius: "40%",
                  backgroundColor: theme.palette.background.default,
                  padding: "1px",

                  width: `${indicatorIconRadius - 2}px`,
                  height: `${indicatorIconRadius - 2}px`,
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title={tooltipTitle}>
              <HelpOutlineOutlinedIcon
                style={{
                  color: theme.palette.reviewCard.indicatorColor,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.background.default,
                  width: `${indicatorIconRadius}px`,
                  height: `${indicatorIconRadius}px`,
                }}
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
