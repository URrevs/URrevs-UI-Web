import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { InteractionBody } from "./InteractionBody";
import { useTheme } from "@emotion/react";
import { InteractionFooter } from "./InteractionFooter";
import { useAppSelector } from "../../store/hooks";
import { comment } from "stylis";
import { PostingField } from "../PostingComponents/PostingField";
import { CommentReply } from "./CommentReply";
import { Virtuoso } from "react-virtuoso";
import { TextButton } from "../Buttons/TextButton";

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
  reportFunction,
  replies = [],
  likeReplyRequest,
  unLikeReplyRequest,
  replyReportFunction,
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
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplyField = () => {
    setShowReplyField((show) => !show);
    setShowReplies((s) => !s);
  };

  const repliesPadding = "50px";

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
        reportFunction={reportFunction}
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
          type={"comment"}
        ></InteractionFooter>
      </InteractionBody>
      {/* Posting field */}
      <div
        style={{
          marginBottom: "10px",
          paddingRight: theme.direction === "rtl" && repliesPadding,
          marginLeft: theme.direction === "ltr" && repliesPadding,
        }}
      >
        {showReplyField && (
          <PostingField
            avatar={true}
            placeholder={textContainer.writeAReply}
            reply
            backgroundColor={
              theme.isMobile &&
              theme.palette.interactionCard.backgroundMobileColor
            }
            onSubmit={(text) => submitReplyHandler(text, commentId)}
          />
        )}
      </div>

      {/* replies list */}
      <div
        style={{
          marginRight: theme.direction === "rtl" && repliesPadding,
          marginLeft: theme.direction === "ltr" && repliesPadding,
        }}
      >
        {replies.length !== 0 && !showReplies ? (
          <TextButton
            title={`${replies.length} ${textContainer.reply}`}
            onClick={() => setShowReplies((show) => !show)}
          />
        ) : (
          <Virtuoso
            useWindowScroll
            data={replies}
            increaseViewportBy={{ top: 500, bottom: 500 }}
            overscan={10}
            itemContent={(index, reply) => {
              return (
                <CommentReply
                  replyId={reply._id}
                  date={reply.createdAt}
                  likes={reply.likes}
                  text={reply.content}
                  liked={reply.liked}
                  replyLike={likeReplyRequest}
                  replyUnlike={unLikeReplyRequest}
                  commentId={commentId}
                  avatar={reply.userPicture}
                  userName={reply.userName}
                  userId={reply.userId}
                  reportFunction={() => {
                    replyReportFunction(commentId, reply._id);
                  }}
                />
              );
            }}
          />
        )}
      </div>
    </div>
  );
};
