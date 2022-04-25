import { useTheme } from "@emotion/react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from "react";

const ExpansionArrow = ({
  clearIndexCache,
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
            onClick={() => {
              setExpanded(false);
              handleExpandClick();
              clearIndexCache(index);
            }}
          />
        ) : (
          <ArrowDropDownRoundedIcon
            sx={{ fontSize: "30px" }}
            onClick={() => {
              handleExpandClick();
              clearIndexCache(index);
            }}
          />
        )}
      </Avatar>
    </Container>
  );
};

export default ExpansionArrow;
