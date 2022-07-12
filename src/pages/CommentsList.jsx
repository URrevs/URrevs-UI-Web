import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { Fragment } from "react";
import { Virtuoso } from "react-virtuoso";
import { Comment } from "../Components/Interactions/Comment";
import { CommentReply } from "../Components/Interactions/CommentReply";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { PostingField } from "../Components/PostingComponents/PostingField";
import { useAppSelector } from "../store/hooks";

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
            context={{ endOfData, noData: commentsList.length }}
            data={commentsList}
            endReached={loadMore}
            increaseViewportBy={{ top: 2500, bottom: 2500 }}
            overscan={20}
            itemContent={(index, comment) => {
              return (
                <Fragment>
                  {" "}
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
                    likeReplyRequest={likeReplyRequest}
                    unLikeReplyRequest={unLikeReplyRequest}
                    replies={comment.replies}
                    replyReportFunction={replyReportFunction}
                  />
                </Fragment>
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
  ) : (
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
  );
};
