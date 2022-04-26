import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { InteractionBody } from "./InteractionBody";
import { useTheme } from "@emotion/react";

export const Comment = (props) => {
  const condition = true;
  const buttonName = condition ? "أعجبني" : "اعجاب";
  const theme = useTheme();
  const renderIcon = () => {
    return (
      <ThumbUpIcon
        sx={{
          fontSize: "14px",
          color: theme.palette.interactionCard.iconColor,
        }}
      />
    );
  };
  return (
    <div style={{ marginRight: "28px" }}>
      <InteractionBody
        {...props}
        buttonName={buttonName}
        condition={condition}
        renderIcon={renderIcon}
      ></InteractionBody>
    </div>
  );
};
