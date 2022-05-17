import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { InteractionBody } from "./InteractionBody";
import { useTheme } from "@emotion/react";
import { InteractionFooter } from "./InteractionFooter";
import { useAppSelector } from "../../store/hooks";

export const CommentReply = ({
  date,
  likes,
  text,
  user,
  replyLike,
  replyUnlike,
  liked,
  replyId,
  commentId,
  avatar,
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const onLikeClickHandler = liked
    ? replyUnlike.bind(null, commentId, replyId)
    : replyLike.bind(null, commentId, replyId);

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
    <div style={{ marginRight: "56px", padding: "4px 0px" }}>
      <InteractionBody
        user={user}
        likes={likes}
        date={date}
        text={text}
        avatarSize="32px"
        buttonName={buttonName}
        reply={false}
        renderIcon={renderIcon}
        avatar={avatar}
      >
        <InteractionFooter
          date={date}
          condition={liked}
          onClickHandler={onLikeClickHandler}
          reply={true}
          buttonName={buttonName}
          commentLike={replyLike}
          commentUnlike={replyUnlike}
          commentId={commentId}
        ></InteractionFooter>
      </InteractionBody>
    </div>
  );
};
