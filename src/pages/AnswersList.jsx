import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { Fragment } from "react";
import { Virtuoso } from "react-virtuoso";
import { Answer } from "../Components/Interactions/Answer";
import { CommentReply } from "../Components/Interactions/CommentReply";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { PostingField } from "../Components/PostingComponents/PostingField";
import { useAppSelector } from "../store/hooks";

export function AnswersList({
  commentsList,
  commentLike,
  commentUnlike,
  replyLike,
  replyUnlike,
  reviewCard,
  submitReplyHandler,
  acceptAnswer,
  rejectAnswer,
  questionOwnerId,
  questionId,
  loadMore,
  endOfData,
  submitCommentHandler,
  answerReportFunction,
  replyReportFunction,
}) {
  const theme = useTheme();
  const isMobile = theme.isMobile;

  const desktopTheme = !isMobile
    ? {
        background: theme.palette.reviewCard.reviewCardColor,
        padding: "0px 4px 4px 4px",
        borderRadius: "10px",
      }
    : {};
  const textContainer = useAppSelector((state) => state.language.textContainer);

  return (
    <Fragment>
      <div style={{ height: "16px" }}></div>
      <div style={{ ...desktopTheme }}>
        {reviewCard()}
        <div style={{ padding: "0 12px" }}>
          {!isMobile && (
            <Fragment>
              <PostingField
                avatar={true}
                placeholder={textContainer.writeAnAnswer}
                onSubmit={(comment) => submitCommentHandler(comment)}
              />
              <br />
            </Fragment>
          )}
          <Virtuoso
            useWindowScroll
            data={commentsList}
            context={{ endOfData, noData: commentsList.length }}
            endReached={loadMore}
            increaseViewportBy={{ top: 2500, bottom: 2500 }}
            overscan={20}
            itemContent={(index, comment) => {
              return (
                <Answer
                  commentId={comment._id}
                  text={comment.content}
                  date={comment.createdAt}
                  likes={comment.upvotes}
                  upvoted={comment.upvoted}
                  commentLike={commentLike}
                  commentUnlike={commentUnlike}
                  submitReplyHandler={submitReplyHandler}
                  avatar={comment.picture}
                  ownerId={comment.userId}
                  ownedAt={comment.ownedAt}
                  questionOwnerId={questionOwnerId}
                  questionId={questionId}
                  acceptAnswer={acceptAnswer}
                  rejectAnswer={rejectAnswer}
                  acceptedAnswer={comment.isAccepted}
                  showReply={true}
                  userName={comment.userName}
                  userId={comment.userId}
                  answerReportFunction={() => answerReportFunction(comment._id)}
                  likeReplyRequest={replyLike}
                  unLikeReplyRequest={replyUnlike}
                  replies={comment.replies}
                  replyReportFunction={replyReportFunction}
                />
              );
            }}
            components={{ Footer }}
          />
        </div>
      </div>
      <div style={{ height: "16px" }}></div>
    </Fragment>
  );
}

const Footer = ({ context }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const end = context.endOfData;
  return !end ? (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <LoadingSpinner />
    </div>
  ) : context.noData === 0 ? (
    <Typography
      style={{
        display: "flex",
        padding: "16px 0",
        justifyContent: "center",
      }}
      variant="S15W500C050505"
    >
      {textContainer.itemsNotFound}
    </Typography>
  ) : (
    <></>
  );
};
