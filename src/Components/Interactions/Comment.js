import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { InteractionBody } from "./InteractionBody";
import { useTheme } from "@emotion/react";
import { InteractionFooter } from "./InteractionFooter";
import { useAppSelector } from "../../store/hooks";

export const Comment = ({
  commentId,
  date,
  likes,
  text,
  user,
  liked,
  commentLike,
  commentUnlike,
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const onLikeClickHandler = liked
    ? commentUnlike.bind(null, commentId)
    : commentLike.bind(null, commentId);

  const buttonName = liked ? textContainer.liked : textContainer.like;
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
    <div style={{ maxWidth: "calc(100% - 20px)" }}>
      <InteractionBody
        user={user}
        likes={likes}
        text={text}
        buttonName={buttonName}
        renderIcon={renderIcon}
      >
        <InteractionFooter
          commentId={commentId}
          date={date}
          condition={liked}
          reply={false}
          buttonName={buttonName}
          onClickHandler={onLikeClickHandler}
        ></InteractionFooter>
      </InteractionBody>
    </div>
  );
};
