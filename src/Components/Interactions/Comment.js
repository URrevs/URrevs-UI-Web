import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { InteractionBody } from "./InteractionBody";
import { useTheme } from "@emotion/react";
import { InteractionFooter } from "./InteractionFooter";
import { useAppSelector } from "../../store/hooks";
import { comment } from "stylis";
import { PostingField } from "../PostingComponents/PostingField";

export const Comment = ({
  commentId,
  date,
  likes,
  text,
  user,
  liked,
  commentLike,
  commentUnlike,
  submitReplyHandler,
  avatar,
  userId,
  userName,
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

  const [showReplyField, setShowReplyField] = useState(false);

  const toggleReplyField = () => setShowReplyField((show) => !show);

  return (
    <div style={{ maxWidth: "calc(100% - 20px)", padding: "4px 0px" }}>
      <InteractionBody
        avatar={avatar}
        likes={likes}
        text={text}
        buttonName={buttonName}
        renderIcon={renderIcon}
        userId={userId}
        userName={userName}
      >
        <InteractionFooter
          commentId={commentId}
          date={date}
          condition={liked}
          reply={false}
          buttonName={buttonName}
          onClickHandler={onLikeClickHandler}
          ownerId={userId}
          showReplyField={toggleReplyField}
        ></InteractionFooter>
      </InteractionBody>

      {showReplyField && (
        <PostingField
          avatar={true}
          placeholder="اكتب رد"
          reply
          onSubmit={(text) => submitReplyHandler(text, commentId)}
        />
      )}
    </div>
  );
};
