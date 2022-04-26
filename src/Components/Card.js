import { useTheme } from "@emotion/react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { styled } from "@mui/material";
import { default as Paper } from "@mui/material/Paper";

const StyledCard = styled(
  Paper,
  {}
)(({ theme }) => ({
  margin: "10px 18px",
  padding: "0",
  borderRadius: "10px",
  backgroundColor: theme.palette.reviewCard.reviewCardColor,
}));

const Card = ({ children, reviewIcon }) => {
  const theme = useTheme();
  const indicatorIconRadius = 24;

  return (
    <div style={{ position: "sticky" }}>
      <StyledCard sx={{ boxShadow: 3 }}>{children}</StyledCard>
      <div
        style={{
          position: "absolute",
          left: theme.direction === "rtl" ? "10px" : "auto",
          right: theme.direction === "rtl" ? "auto" : "10px",
          top: "-5px",
          transform:
            theme.direction === "rtl" ? "rotate(-45deg)" : "rotate(45deg)",
          backgroundColor: theme.palette.background.default,
          width: `${indicatorIconRadius + 4}px`,
          height: `${indicatorIconRadius + 4}px`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {reviewIcon ? (
          <RateReviewOutlinedIcon
            style={{
              color: theme.palette.reviewCard.indicatorColor,
              borderRadius: "40%",
              backgroundColor: theme.palette.background.default,
              width: `${indicatorIconRadius}px`,
              height: `${indicatorIconRadius}px`,
            }}
          />
        ) : (
          <HelpOutlineOutlinedIcon
            style={{
              color: theme.palette.reviewCard.indicatorColor,
              borderRadius: "50%",
              backgroundColor: theme.palette.background.default,
              width: `${indicatorIconRadius}px`,
              height: `${indicatorIconRadius}px`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
