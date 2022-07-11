import React, { useCallback, useEffect, useState } from "react";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ROUTES_NAMES from "../RoutesNames";
import { useLazyGetRecommendedQuery } from "../services/homePage";
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
import { Link } from "react-router-dom";
import { GAevent } from "../functions/gaEvents";
import { GApageView } from "../functions/gaPageView";

function Reviews() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      console.log("clear reviews");
      p = 1;
      dispatch(homePageActions.clearReviews());
    };
  }, []);

  // for google analitycs
  useEffect(() => {
    GApageView("Home Screen");
  }, []);

  const textContainer = useAppSelector((state) => state.language.textContainer);
  const isMobile = useTheme().isMobile;

  const currentUser = useAppSelector((state) => state.auth);

  const reviewsList = useAppSelector((state) => state.homePage.newReviews);

  const [getRecommendedReviews, { isLoading, isFetching, error }] =
    useLazyGetRecommendedQuery();

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

  const addToReviewsList = (data) =>
    dispatch(
      homePageActions.addToLoaddedReviews({
        newReviews: data,
      })
    );

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

  const reviewCard = (review) => {
    if (review.type === "phoneRev") {
      return (
        <PhoneReview
          key={review._id}
          fullScreen={false}
          isExpanded={false}
          reviewDetails={review}
          isPhoneReview={true}
          targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.REVIEWS}?pid=${review.targetId}`}
          userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${review.userId}`}
          stateLikeFn={stateLikeReview}
          stateUnLikeFn={stateUnLikeReview}
          stateShare={stateIncreaseShareCounter}
          fullScreenRoute={`/${ROUTES_NAMES.EXACT_PHONE_REVIEW}?id=${review._id}`}
          showActionBtn={true}
          deleteReviewFromStore={deleteReviewFromStore}
        />
      );
    }

    if (review.type === "companyRev") {
      return (
        <CompanyReview
          key={review._id}
          fullScreen={false}
          isExpanded={false}
          reviewDetails={review}
          isPhoneReview={true}
          targetProfilePath={`/${ROUTES_NAMES.COMPANY_PROFILE}/${ROUTES_NAMES.REVIEWS}?cid=${review.targetId}`}
          userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${review.userId}`}
          stateLikeFn={stateLikeReview}
          stateUnLikeFn={stateUnLikeReview}
          stateShare={stateIncreaseShareCounter}
          showActionBtn={true}
          deleteReviewFromStore={deleteReviewFromStore}
        />
      );
    }

    if (review.type === "phoneQuestion") {
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
      const acceptedAnswerWidget = () => {
        if (review.acceptedAns) {
          return (
            <Answer
              commentId={review.acceptedAns._id}
              date={review.acceptedAns.createdAt}
              user={review.acceptedAns.userName}
              likes={review.acceptedAns.upvotes}
              text={review.acceptedAns.content}
              commentLike={likeCommentRequest}
              commentUnlike={unLikeCommentRequest}
              avatar={review.acceptedAns.picture}
              ownerId={review.acceptedAns.userId}
              ownedAt={review.acceptedAns.ownedAt}
              questionOwnerId={review.userId}
              questionId={review._id}
              acceptAnswer={() => {}}
              rejectAnswer={() => {}}
              acceptedAnswer={true}
              showReply={false}
              upvoted={review.acceptedAns.upvoted}
            />
          );
        }
      };

      return (
        <PhoneQuestion
          key={review._id}
          fullScreen={false}
          isExpanded={false}
          reviewDetails={review}
          isPhoneReview={true}
          targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.QUESTIONS}?pid=${review.targetId}`}
          userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${review.userId}`}
          stateLikeFn={stateLikeQuestion}
          stateUnLikeFn={stateUnLikeQuestion}
          stateShare={stateIncreaseShareCounter}
          showActionBtn={true}
          deleteReviewFromStore={deleteReviewFromStore}
          acceptedAnswerWidget={review.acceptedAns && acceptedAnswerWidget()}
        />
      );
    }

    if (review.type === "companyQuestion") {
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
      const acceptedAnswerWidget = () => {
        if (review.acceptedAns) {
          return (
            <Answer
              commentId={review.acceptedAns._id}
              date={review.acceptedAns.createdAt}
              user={review.acceptedAns.userName}
              likes={review.acceptedAns.upvotes}
              text={review.acceptedAns.content}
              commentLike={likeCommentRequest}
              commentUnlike={unLikeCommentRequest}
              avatar={review.acceptedAns.picture}
              ownerId={review.acceptedAns.userId}
              ownedAt={review.acceptedAns.ownedAt}
              questionOwnerId={review.userId}
              questionId={review._id}
              acceptAnswer={() => {}}
              rejectAnswer={() => {}}
              acceptedAnswer={true}
              showReply={false}
              upvoted={review.acceptedAns.upvoted}
            />
          );
        }
      };

      return (
        <CompanyQuestion
          key={review._id}
          fullScreen={false}
          isExpanded={false}
          reviewDetails={review}
          isPhoneReview={false}
          targetProfilePath={`/${ROUTES_NAMES.COMPANY_PROFILE}/${ROUTES_NAMES.REVIEWS}?cid=${review.targetId}`}
          userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${review.userId}`}
          stateLikeFn={stateLikeQuestion}
          stateUnLikeFn={stateUnLikeQuestion}
          stateShare={stateIncreaseShareCounter}
          showActionBtn={true}
          deleteReviewFromStore={deleteReviewFromStore}
          acceptedAnswerWidget={review.acceptedAns && acceptedAnswerWidget}
        />
      );
    }
  };

  const [endOfData, setEndOfData] = useState(false);

  // first page
  let p = 1;
  // function loads additional comments
  const loadMore = useCallback(() => {
    if (!endOfData) {
      getRecommendedReviews(p).then((data) => {
        if (data.data.length === 0) {
          setEndOfData(true);
        } else {
          addToReviewsList(data.data);
          p++;
        }
      });
    }
  }, [p, endOfData]);

  // to load for the first time
  useEffect(() => {
    const timeout = loadMore();
    return () => clearTimeout(timeout);
  }, []);

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
              <div style={{ height: "25px" }}></div>
            </div>
          ) : null}
          <VirtualReviewList
            endOfData={endOfData}
            loadMore={loadMore}
            reviewCard={reviewCard}
            reviewsList={reviewsList}
          />
        </AlonePostsGrid>
      ) : (
        <FixedGrid>
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
          <VirtualReviewList
            endOfData={endOfData}
            loadMore={loadMore}
            reviewCard={reviewCard}
            reviewsList={reviewsList}
          />
        </FixedGrid>
      )}
    </CustomAppBar>
  );
}

export default Reviews;
