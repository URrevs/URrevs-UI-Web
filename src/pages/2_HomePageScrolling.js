import React, { useEffect, useState } from "react";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ROUTES_NAMES from "../RoutesNames";
import { useGetRecommendedQuery } from "../services/homePage";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { homePageActions } from "../store/homePageSlice";
import VirtualReviewList from "./VirtualListWindowScroll";
import PhoneReview from "../Components/ReviewCard/PhoneReview";
import CompanyQuestion from "../Components/ReviewCard/companyQuestion";
import CompanyReview from "../Components/ReviewCard/CompanyReview";
import PhoneQuestion from "../Components/ReviewCard/phoneQuestion";
import { Answer } from "../Components/Interactions/Answer";
import {
  useLikePhoneQuestionCommentMutation,
  useUnLikePhoneQuestionCommentMutation,
} from "../services/phone_questions";
import {
  useLikeCompanyQuestionCommentMutation,
  useUnLikeCompanyQuestionCommentMutation,
} from "../services/company_questions";
import Banner from "../Components/Banners/Banner";
import { Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { AlonePostsGrid } from "../Components/Grid/AlonePostsGrid";
import { PostingComponent } from "../Components/PostingComponents/PostingComponent";
import { postingModalActions } from "../store/uiPostingModalSlice";

function Reviews() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("clear reviews");
    dispatch(homePageActions.clearReviews());
  }, []);
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const isMobile = useTheme().isMobile;

  const currentUser = useAppSelector((state) => state.auth);

  const reviewsList = useAppSelector((state) => state.homePage.newReviews);

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useGetRecommendedQuery(page);

  const stateLikeReview = (id) =>
    dispatch(homePageActions.setReviewIsLiked({ id: id, isLiked: true }));

  const stateUnLikeReview = (id) =>
    dispatch(homePageActions.setReviewIsLiked({ id: id, isLiked: false }));

  const stateLikeQuestion = (id) =>
    dispatch(homePageActions.setQuestionIsLiked({ id: id, isLiked: true }));

  const stateUnLikeQuestion = (id) =>
    dispatch(homePageActions.setQuestionIsLiked({ id: id, isLiked: false }));

  const stateIncreaseShareCounter = (id) =>
    dispatch(homePageActions.increaseShareCounter({ id: id }));

  const addToReviewsList = () =>
    dispatch(
      homePageActions.addToLoaddedReviews({
        newReviews: data,
      })
    );

  const increasePage = () => setPage(page + 1);

  const deleteReviewFromStore = (id) => {
    dispatch(homePageActions.clearReviews());
    const n = reviewsList.filter((review) => review._id !== id);
    console.log(n);

    dispatch(
      homePageActions.addToLoaddedReviews({
        newReviews: n,
      })
    );
  };

  // like comment
  const [likePhoneQuestionAnswer] = useLikePhoneQuestionCommentMutation();
  // unlike comment
  const [unlikePhoneQuestionAnswer] = useUnLikePhoneQuestionCommentMutation();

  // like comment
  const [likeCompanyQuestionAnswer] = useLikeCompanyQuestionCommentMutation();
  // unlike comment
  const [unlikeCompanyQuestionAnswer] =
    useUnLikeCompanyQuestionCommentMutation();

  const reviewCard = (index, clearCache) => {
    const currentElement = reviewsList[index];
    if (currentElement.type === "phoneRev") {
      return (
        <PhoneReview
          key={reviewsList[index]._id}
          index={index}
          fullScreen={false}
          isExpanded={false}
          clearIndexCache={clearCache}
          reviewDetails={reviewsList[index]}
          isPhoneReview={true}
          targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}?pid=${reviewsList[index].targetId}`}
          userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].userId}`}
          stateLikeFn={stateLikeReview}
          stateUnLikeFn={stateUnLikeReview}
          stateShare={stateIncreaseShareCounter}
          fullScreenRoute={`/${ROUTES_NAMES.EXACT_PHONE_REVIEW}?id=${reviewsList[index]._id}`}
          showActionBtn={true}
          deleteReviewFromStore={deleteReviewFromStore}
        />
      );
    }

    if (currentElement.type === "companyRev") {
      return (
        <CompanyReview
          key={reviewsList[index]._id}
          index={index}
          fullScreen={false}
          isExpanded={false}
          clearIndexCache={clearCache}
          reviewDetails={reviewsList[index]}
          isPhoneReview={true}
          targetProfilePath={`/${ROUTES_NAMES.COMPANY_PROFILE}?cid=${reviewsList[index].targetId}`}
          userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].userId}`}
          stateLikeFn={stateLikeReview}
          stateUnLikeFn={stateUnLikeReview}
          stateShare={stateIncreaseShareCounter}
          showActionBtn={true}
          deleteReviewFromStore={deleteReviewFromStore}
        />
      );
    }

    if (currentElement.type === "phoneQuestion") {
      // comment like and unlike
      const stateLikePhoneComment = (id) =>
        dispatch(
          homePageActions.voteForAcceptedAnswer({ id: id, isLiked: true })
        );

      const stateUnLikePhoneComment = (id) =>
        dispatch(
          homePageActions.voteForAcceptedAnswer({ id: id, isLiked: false })
        );

      const likeCommentRequest = (id) => {
        likePhoneQuestionAnswer({
          commentId: id,
          doFn: stateLikePhoneComment,
          unDoFn: stateUnLikePhoneComment,
        });
      };

      const unLikeCommentRequest = (id) => {
        unlikePhoneQuestionAnswer({
          commentId: id,
          doFn: stateUnLikePhoneComment,
          unDoFn: stateLikePhoneComment,
        });
      };

      // add accepted answer if found
      const acceptedAnswerWidget = (index) => {
        if (currentElement.acceptedAns) {
          return (
            <Answer
              commentId={currentElement.acceptedAns._id}
              date={currentElement.acceptedAns.createdAt}
              user={currentElement.acceptedAns.userName}
              likes={currentElement.acceptedAns.upvotes}
              text={currentElement.acceptedAns.content}
              commentLike={likeCommentRequest}
              commentUnlike={unLikeCommentRequest}
              avatar={currentElement.acceptedAns.picture}
              ownerId={currentElement.acceptedAns.userId}
              ownedAt={currentElement.acceptedAns.ownedAt}
              questionOwnerId={currentElement.userId}
              questionId={currentElement._id}
              acceptAnswer={() => {}}
              rejectAnswer={() => {}}
              acceptedAnswer={true}
              showReply={false}
              upvoted={currentElement.acceptedAns.upvoted}
            />
          );
        }
      };

      return (
        <PhoneQuestion
          key={reviewsList[index]._id}
          index={0}
          fullScreen={false}
          isExpanded={false}
          clearIndexCache={clearCache}
          reviewDetails={reviewsList[index]}
          isPhoneReview={true}
          targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}?pid=${reviewsList[index].targetId}`}
          userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].userId}`}
          stateLikeFn={stateLikeQuestion}
          stateUnLikeFn={stateUnLikeQuestion}
          stateShare={stateIncreaseShareCounter}
          showActionBtn={true}
          deleteReviewFromStore={deleteReviewFromStore}
          acceptedAnswerWidget={acceptedAnswerWidget.bind(null, index)}
        />
      );
    }

    if (currentElement.type === "companyQuestion") {
      // comment like and unlike
      const stateLikePhoneComment = (id) =>
        dispatch(
          homePageActions.voteForAcceptedAnswer({ id: id, isLiked: true })
        );

      const stateUnLikePhoneComment = (id) =>
        dispatch(
          homePageActions.voteForAcceptedAnswer({ id: id, isLiked: false })
        );

      const likeCommentRequest = (id) => {
        likeCompanyQuestionAnswer({
          commentId: id,
          doFn: stateLikePhoneComment,
          unDoFn: stateUnLikePhoneComment,
        });
      };

      const unLikeCommentRequest = (id) => {
        unlikeCompanyQuestionAnswer({
          commentId: id,
          doFn: stateUnLikePhoneComment,
          unDoFn: stateLikePhoneComment,
        });
      };

      // add accepted answer if found
      const acceptedAnswerWidget = (index) => {
        if (currentElement.acceptedAns) {
          return (
            <Answer
              commentId={currentElement.acceptedAns._id}
              date={currentElement.acceptedAns.createdAt}
              user={currentElement.acceptedAns.userName}
              likes={currentElement.acceptedAns.upvotes}
              text={currentElement.acceptedAns.content}
              commentLike={likeCommentRequest}
              commentUnlike={unLikeCommentRequest}
              avatar={currentElement.acceptedAns.picture}
              ownerId={currentElement.acceptedAns.userId}
              ownedAt={currentElement.acceptedAns.ownedAt}
              questionOwnerId={currentElement.userId}
              questionId={currentElement._id}
              acceptAnswer={() => {}}
              rejectAnswer={() => {}}
              acceptedAnswer={true}
              showReply={false}
              upvoted={currentElement.acceptedAns.upvoted}
            />
          );
        }
      };

      return (
        <CompanyQuestion
          key={reviewsList[index]._id}
          index={0}
          fullScreen={false}
          isExpanded={false}
          clearIndexCache={clearCache}
          reviewDetails={reviewsList[index]}
          isPhoneReview={false}
          targetProfilePath={`/${ROUTES_NAMES.COMPANY_PROFILE}?cid=${reviewsList[index].targetId}`}
          userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].userId}`}
          stateLikeFn={stateLikeQuestion}
          stateUnLikeFn={stateUnLikeQuestion}
          stateShare={stateIncreaseShareCounter}
          showActionBtn={true}
          deleteReviewFromStore={deleteReviewFromStore}
          acceptedAnswerWidget={acceptedAnswerWidget.bind(null, index)}
        />
      );
    }
  };

  return (
    <CustomAppBar showLogo showSearch showProfile>
      <div style={{ height: "20px" }}></div>
      {!isMobile ? (
        !currentUser.isLoggedIn && (
          <Grid container style={{ display: "flex" }}>
            <Grid item xl={2} md={1} xs={0}></Grid>
            <Grid item xl={8} md={10} xs={12}>
              <div style={{ height: "20px" }} />
              <Banner></Banner>
            </Grid>
            <Grid item xl={2} md={1} xs={0}></Grid>
          </Grid>
        )
      ) : (
        <div></div>
      )}

      {!isMobile ? (
        <AlonePostsGrid>
          {currentUser.isLoggedIn ? (
            <div>
              <PostingComponent
                label={textContainer.youCanWriteReviewOrAskAQuestion}
                placeholder={textContainer.writeYourPost}
                params={{
                  disabled: true,
                  onClick: () => {
                    dispatch(
                      postingModalActions.showPostingModal({
                        tab: 0,
                      })
                    );
                  },
                }}
              />
              <div style={{ height: "50px" }}></div>
            </div>
          ) : null}
          <VirtualReviewList
            reviewCard={reviewCard}
            reviewsList={reviewsList}
            page={page}
            data={data}
            error={error}
            isLoading={isLoading}
            isFetching={isFetching}
            addToReviewsList={addToReviewsList}
            increasePage={increasePage}
          />
        </AlonePostsGrid>
      ) : (
        <FixedGrid>
          <VirtualReviewList
            reviewCard={reviewCard}
            reviewsList={reviewsList}
            page={page}
            data={data}
            error={error}
            isLoading={isLoading}
            isFetching={isFetching}
            addToReviewsList={addToReviewsList}
            increasePage={increasePage}
          />
        </FixedGrid>
      )}
    </CustomAppBar>
  );
}

export default Reviews;
