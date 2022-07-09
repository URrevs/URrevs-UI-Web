import { useTheme } from "@emotion/react";
import { Fragment } from "react";
import { Virtuoso } from "react-virtuoso";
import { Comment } from "../Components/Interactions/Comment";
import { CommentReply } from "../Components/Interactions/CommentReply";
import { PostingField } from "../Components/PostingComponents/PostingField";

export default function CommentsList({
  commentsList,
  reviewCard,
  submitReplyHandler,
  submitCommentHandler,
  endOfData,
  loadMore,
  likeCommentRequest,
  unLikeCommentRequest,
  likeReplyRequest,
  unLikeReplyRequest,
  replyReportFunction,
  commentReportFunction,
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
                placeholder="اكتب تعليقا"
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
              return comment.isReply ? (
                <CommentReply
                  replyId={comment._id}
                  date={comment.createdAt}
                  likes={comment.likes}
                  text={comment.content}
                  liked={comment.liked}
                  replyLike={likeReplyRequest}
                  replyUnlike={unLikeReplyRequest}
                  commentId={comment.commentId}
                  avatar={comment.userPicture}
                  userName={comment.userName}
                  userId={comment.userId}
                  reportFunction={() => {
                    replyReportFunction(comment.commentId, comment._id);
                  }}
                />
              ) : (
                <Comment
                  commentId={comment._id}
                  date={comment.createdAt}
                  likes={comment.likes}
                  text={comment.content}
                  liked={comment.liked}
                  commentLike={likeCommentRequest}
                  commentUnlike={unLikeCommentRequest}
                  submitReplyHandler={submitReplyHandler}
                  avatar={comment.userPicture}
                  userName={comment.userName}
                  userId={comment.userId}
                  reportFunction={() => {
                    commentReportFunction(comment._id);
                  }}
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
