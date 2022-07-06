import { useTheme } from "@emotion/react";
import { Fragment } from "react";
import { Virtuoso } from "react-virtuoso";
import { Answer } from "../Components/Interactions/Answer";
import { CommentReply } from "../Components/Interactions/CommentReply";
import { PostingField } from "../Components/PostingComponents/PostingField";

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
}) {
  const theme = useTheme();
  const isMobile = theme.isMobile;

  const desktopTheme = !isMobile
    ? {
        background: theme.palette.reviewCard.reviewCardColor,
        padding: "0px 4px 4px 4px",
        borderRadius: "10px",
        marginBottom: "10px",
      }
    : {};

  return (
    <div style={desktopTheme}>
      {reviewCard()}
      <div style={{ padding: "0 12px" }}>
        {!isMobile && (
          <Fragment>
            <PostingField
              avatar={true}
              placeholder="اكتب اجابة"
              onSubmit={(comment) => submitCommentHandler(comment)}
            />
            <br />
          </Fragment>
        )}
        <Virtuoso
          useWindowScroll
          context={{ endOfData }}
          data={commentsList}
          endReached={loadMore}
          increaseViewportBy={{ top: 2500, bottom: 2500 }}
          overscan={20}
          itemContent={(index, comment) => {
            console.log(comment);
            return comment.isReply ? (
              <CommentReply
                replyId={comment._id}
                date={comment.createdAt}
                user={comment.userName}
                likes={comment.likes}
                text={comment.content}
                liked={comment.liked}
                replyLike={replyLike}
                replyUnlike={replyUnlike}
                commentId={comment.commentId}
                avatar={comment.userPicture}
                userId={comment.userId}
              />
            ) : (
              <Answer
                commentId={comment._id}
                text={comment.content}
                date={comment.createdAt}
                user={comment.userName}
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
              />
            );
          }}
          components={{ Footer }}
        />
      </div>
    </div>
  );
}

const Footer = ({ context }) => {
  const end = context.endOfData;
  return (
    !end && (
      <div
        style={{
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    )
  );
};
