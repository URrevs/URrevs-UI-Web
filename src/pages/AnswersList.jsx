import { useTheme } from "@emotion/react";
import React, { Fragment, useEffect, useRef } from "react";
import {
  AutoSizer,
  CellMeasurer,
  List,
  WindowScroller
} from "react-virtualized";
import { Answer } from "../Components/Interactions/Answer";
import { CommentReply } from "../Components/Interactions/CommentReply";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { useAppDispatch } from "../store/hooks";

let maxIndex = 0;

export default function CommentsList({
  commentsList,
  page,
  data,
  error,
  isLoading,
  isFetching,
  commentLike,
  commentUnlike,
  replyLike,
  replyUnlike,
  addToReviewsList,
  increasePage,
  reviewCard,
  cache,
  clearCache,
  submitReplyHandler,
  acceptAnswer,
  rejectAnswer,
  questionOwnerId,
  questionId,
}) {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const listRef = useRef();

  useEffect(() => {
    if (data) {
      addToReviewsList();
      if (page < 2 && !isLoading && !isFetching) {
        increasePage();
      }
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error.status}
        {error.code}
        {error.message}
      </div>
    );
  }

  const renderRow = ({ index, key, style, parent }) => {
    if (
      maxIndex !== 0 &&
      page >= 2 &&
      !isLoading &&
      !isFetching &&
      maxIndex === commentsList.length &&
      data.length !== 0
    ) {
      maxIndex = 0;
      increasePage();
    }
    maxIndex = Math.max(index, maxIndex);

    return index < commentsList.length ? (
      <div
        key={key}
        style={{
          ...style,
          direction: theme.direction,
        }}
      >
        {
          <CellMeasurer
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
          >
            <div>
              {commentsList[index].isReply ? (
                <CommentReply
                  replyId={commentsList[index]._id}
                  date={commentsList[index].createdAt}
                  user={commentsList[index].userName}
                  likes={commentsList[index].likes}
                  text={commentsList[index].content}
                  liked={commentsList[index].liked}
                  replyLike={replyLike}
                  replyUnlike={replyUnlike}
                  commentId={commentsList[index].commentId}
                  avatar={commentsList[index].userPicture}
                  userId={commentsList[index].userId}
                />
              ) : (
                <Answer
                  commentId={commentsList[index]._id}
                  date={commentsList[index].createdAt}
                  user={commentsList[index].userName}
                  likes={commentsList[index].upvotes}
                  text={commentsList[index].content}
                  upvoted={commentsList[index].upvoted}
                  commentLike={commentLike}
                  commentUnlike={commentUnlike}
                  submitReplyHandler={submitReplyHandler}
                  avatar={commentsList[index].picture}
                  ownerId={commentsList[index].userId}
                  ownedAt={commentsList[index].ownedAt}
                  questionOwnerId={questionOwnerId}
                  questionId={questionId}
                  acceptAnswer={acceptAnswer}
                  rejectAnswer={rejectAnswer}
                />
              )}
            </div>
          </CellMeasurer>
        }
      </div>
    ) : null;
  };

  return (
    <Fragment>
      <CustomAppBar showBackBtn showProfile>
        <div style={{ height: "calc(100vh)", margin: "55px 0" }}>
          {reviewCard()}
          <AutoSizer>
            {({ height, width }) => {
              return (
                <WindowScroller>
                  {({ height, isScrolling, registerChild, scrollTop }) => (
                    <div ref={registerChild}>
                      <List
                        ref={listRef}
                        autoHeight
                        overscanRowCount={10}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                        width={width}
                        height={height}
                        deferredMeasurementCache={cache}
                        rowHeight={cache.rowHeight}
                        rowCount={commentsList.length + 1}
                        rowRenderer={renderRow}
                      />
                    </div>
                  )}
                </WindowScroller>
              );
            }}
          </AutoSizer>
        </div>
      </CustomAppBar>
    </Fragment>
  );
}
