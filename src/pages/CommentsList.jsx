import { useTheme } from "@emotion/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller,
} from "react-virtualized";
import LoadingReviewSkeleton, {
  loadingSkeletonHeight,
} from "../Components/Loaders/LoadingReviewSkeleton";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import ROUTES_NAMES from "../RoutesNames";
import { useAppDispatch } from "../store/hooks";
import { Comment } from "../Components/Interactions/Comment";
import { CommentReply } from "../Components/Interactions/CommentReply";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";

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
  clearAllCache,
  clearCache,
  submitReplyHandler,
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

  useEffect(() => {
    if (page <= 2) clearCache(0);
  }, [page]);

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

    return (
      <div key={key}>
        {
          <CellMeasurer
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
          >
            <div style={{ ...style, direction: theme.direction }}>
              {index === 0 ? (
                reviewCard()
              ) : index >= commentsList.length ? (
                data.length === 0 ? (
                  <div>لا يوجد عناصر</div>
                ) : (
                  [...Array(1)].map((a, index) => (
                    <div style={{ height: "166px" }}>Loading...</div>
                  ))
                )
              ) : (
                <Fragment>
                  {commentsList[index - 1].isReply ? (
                    <CommentReply
                      replyId={commentsList[index - 1]._id}
                      date={commentsList[index - 1].createdAt}
                      user={commentsList[index - 1].userName}
                      likes={commentsList[index - 1].likes}
                      text={commentsList[index - 1].content}
                      liked={commentsList[index - 1].liked}
                      replyLike={replyLike}
                      replyUnlike={replyUnlike}
                      commentId={commentsList[index - 1].commentId}
                      avatar={commentsList[index - 1].userPicture}
                      userId={commentsList[index - 1].userId}
                    />
                  ) : (
                    <Comment
                      commentId={commentsList[index - 1]._id}
                      date={commentsList[index - 1].createdAt}
                      user={commentsList[index - 1].userName}
                      likes={commentsList[index - 1].likes}
                      text={commentsList[index - 1].content}
                      liked={commentsList[index - 1].liked}
                      commentLike={commentLike}
                      commentUnlike={commentUnlike}
                      submitReplyHandler={submitReplyHandler}
                      avatar={commentsList[index - 1].userPicture}
                      userId={commentsList[index - 1].userId}
                    />
                  )}
                </Fragment>
              )}
            </div>
          </CellMeasurer>
        }
      </div>
    );
  };

  console.log(cache._rowHeightCache);

  return (
    <Fragment>
      <CustomAppBar showBackBtn showProfile>
        <div
          style={{
            height: "calc(100vh)",
            marginTop: "55px",
            marginBottom: "670px",
          }}
        >
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
                        rowCount={commentsList.length + 2}
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
