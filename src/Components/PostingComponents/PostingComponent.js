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
  /*Edit Text Field here */
  const theme = useTheme();
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
        <PostingField placeholder={placeholder} params={params} />
      </div>
    </Card>
  );
};
