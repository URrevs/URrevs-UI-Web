import { useTheme } from "@emotion/react";
import { Card, Typography } from "@mui/material";
import React from "react";
import { CARD_BORDER_RADIUS } from "../../constants";
import { PostingField } from "./PostingField";

export const PostingComponent = ({
  placeholder = "",
  label = "",
  params = {},
}) => {
  const theme = useTheme();
  /*Edit Text Field here */
  return (
    <Card
      elevation={3}
      style={{
        borderRadius: `${CARD_BORDER_RADIUS}px`,
        //Just for styling
        //   minHeight: "129px",
        //   minWidth: "641px",
      }}
    >
      <div style={{ padding: "20px 17px 0px 17px" }}>
        <Typography variant="S14W500C050505">{label}</Typography>
      </div>
      <div style={{ padding: "19px 8px 29px 6px" }}>
        <Card
          elevation={0}
          sx={{
            background: theme.palette.textField.postingFieldBackground,
            height: "46px",
            borderRadius: "30px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0px 15px",
          }}
          onClick={params.onClick}
        >
          <Typography variant="S16W300C050505">{placeholder}</Typography>
        </Card>
      </div>
    </Card>
  );
};
