import { useTheme } from "@emotion/react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from "react";

export const ExpansionArrow = ({
  index,
  expanded,
  setExpanded,
  handleExpandClick,
}) => {
  const theme = useTheme();

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "8px",
      }}
    >
      <Avatar
        sx={{
          "&:hover": { cursor: "pointer" },
          bgcolor: theme.palette.reviewCard.expandIcon,
          width: 28,
          height: 28,
          boxShadow: "0px 1px 4px 0px rgb(0 0 0 / 30%)",
        }}
      >
        {expanded ? (
          <ArrowDropUpRoundedIcon
            sx={{ fontSize: "30px" }}
            // onClick={() => {
            //   setExpanded(false);
            //   handleExpandClick();
            // }}
          />
        ) : (
          <ArrowDropDownRoundedIcon
            sx={{ fontSize: "30px" }}
            // onClick={() => {
            //   handleExpandClick();
            // }}
          />
        )}
      </Avatar>
    </Container>
  );
};
