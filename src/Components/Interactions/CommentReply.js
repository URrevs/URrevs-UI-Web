import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { InteractionBody } from "./InteractionBody";
import { useTheme } from "@emotion/react";
import { InteractionFooter } from "./InteractionFooter";
import { useAppSelector } from "../../store/hooks";

export const CommentReply = (props) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const [like, setLike] = useState(false);
  const onClickHandler = () => {
    setLike(!like);
  };
  const buttonName = like ? textContainer.liked : textContainer.like;
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
    <div style={{ marginRight: "56px" }}>
      <InteractionBody
        {...props}
        avatar="32px"
        buttonName={buttonName}
        reply={true}
        renderIcon={renderIcon}
      >
        <InteractionFooter
          date={props.date}
          condition={like}
          onClickHandler={onClickHandler}
          reply={true}
          buttonName={buttonName}
        ></InteractionFooter>
      </InteractionBody>
    </div>
  );
};
