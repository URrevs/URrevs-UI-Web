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
import { PostingField } from "../Components/PostingComponents/PostingField";

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
  submitCommentHandler,
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

  const desktopTheme = !theme.isMobile && {
    background: "#fff",
    padding: "0px 4px 4px 4px",
    borderRadius: "10px",
  };

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

    const newIndex = index - 2;

    return (
      <div key={key}>
        <CellMeasurer
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <div
            style={{
              ...style,
              direction: theme.direction,
            }}
          >
            {index === 0 ? (
              reviewCard()
            ) : index === 1 ? (
              <PostingField
                avatar={true}
                placeholder="اكتب تعليقا"
                onSubmit={(comment) => submitCommentHandler(comment)}
              />
            ) : index >= commentsList.length + 3 ? (
              // for spacing bottom of last of items
              <div style={{ height: "100px" }}></div>
            ) : index >= commentsList.length + 2 ? (
              data.length === 0 ? (
                commentsList.length === 0 && <div> لا يوجد عناصر</div>
              ) : (
                <LoadingReviewSkeleton
                  clear={() => {
                    clearCache(index - 2);
                    clearCache(index - 1);
                    clearCache(index);
                    clearCache(index + 1);
                    clearCache(index + 2);
                  }}
                />
              )
            ) : (
              <Fragment>
                {commentsList[newIndex].isReply ? (
                  <CommentReply
                    replyId={commentsList[newIndex]._id}
                    date={commentsList[newIndex].createdAt}
                    user={commentsList[newIndex].userName}
                    likes={commentsList[newIndex].likes}
                    text={commentsList[newIndex].content}
                    liked={commentsList[newIndex].liked}
                    replyLike={replyLike}
                    replyUnlike={replyUnlike}
                    commentId={commentsList[newIndex].commentId}
                    avatar={commentsList[newIndex].userPicture}
                    userId={commentsList[newIndex].userId}
                  />
                ) : (
                  <Comment
                    commentId={commentsList[newIndex]._id}
                    date={commentsList[newIndex].createdAt}
                    user={commentsList[newIndex].userName}
                    likes={commentsList[newIndex].likes}
                    text={commentsList[newIndex].content}
                    liked={commentsList[newIndex].liked}
                    commentLike={commentLike}
                    commentUnlike={commentUnlike}
                    submitReplyHandler={submitReplyHandler.bind(this, index)}
                    avatar={commentsList[newIndex].userPicture}
                    userId={commentsList[newIndex].userId}
                  />
                )}
              </Fragment>
            )}
          </div>
        </CellMeasurer>
      </div>
    );
  };

  return (
    <Fragment>
      <CustomAppBar showBackBtn showProfile>
        <div
          style={{
            // height: "calc(100vh)",
            marginTop: "55px",
          }}
        >
          <AutoSizer>
            {({ height, width }) => {
              return (
                <WindowScroller>
                  {({ height, isScrolling, registerChild, scrollTop }) => (
                    <div ref={registerChild}>
                      <List
                        style={{ ...desktopTheme }}
                        ref={listRef}
                        autoHeight
                        overscanRowCount={10}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                        width={width}
                        height={height}
                        deferredMeasurementCache={cache}
                        rowHeight={cache.rowHeight}
                        rowCount={commentsList.length + 4}
                        rowRenderer={renderRow}
                      />
                    </div>
                  )}
                </WindowScroller>
              );
            }}
          </AutoSizer>
          <div style={{ height: "130px" }}></div>
        </div>
      </CustomAppBar>
    </Fragment>
  );
}
