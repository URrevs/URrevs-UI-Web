import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { InteractionBody } from "./InteractionBody";
import { useTheme } from "@emotion/react";
export const CommentReply = (props) => {
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
    <div style={{ marginRight: "76px" }}>
      <InteractionBody
        {...props}
        avatar="32px"
        buttonName={buttonName}
        condition={condition}
        reply={true}
        renderIcon={renderIcon}
      ></InteractionBody>
    </div>
  );
};
