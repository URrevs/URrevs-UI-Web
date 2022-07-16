import { useTheme } from "@emotion/react";
import { Box, ButtonBase, Divider, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND,
  MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND,
  USER_CIRCLE_AVATAR_LARGE,
} from "../../constants";
import { cropText } from "../../functions/cropText";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Card from "../Card";
import { StarLine } from "../StarLine";
import CardActionButtons from "./CardActions/CardActionButtons";
import { FullStars } from "./CardBody/FullStars";
import ProsConsText from "./CardBody/ProsConsText";
import CardFooter from "./CardFooter/CardFooter";
import CardHeader from "./CardHeader/CardHeader";

export default function ReviewCard({
  ukey,
  index,
  reviewDetails,
  isPhoneReview,
  fullScreen,
  isExpanded,
  targetProfilePath,
  userProfilePath,
  fullScreenRoute,
  actionBtnFunction,
  reportFunction,
  likeBtnHandler,
  fullScreenFn,
  seeMoreFn,
  shareBtnFn,
  disableElevation = false,
  showBottomLine,
  verificationRatio,
  verifyPhone,
  isCompany = false,
}) {
  const isReview = true;
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isLiked = reviewDetails.liked;

  const ratings = [
    reviewDetails.generalRating,
    reviewDetails.uiRating,
    reviewDetails.manufacturingQuality,
    reviewDetails.valueForMoney,
    reviewDetails.camera,
    reviewDetails.callQuality,
    reviewDetails.battery,
  ];

  const pros = reviewDetails.pros;
  const cons = reviewDetails.cons;

  const userName = reviewDetails.userName;

  const productName = reviewDetails.targetName;

  const initialIsExpanded = isExpanded === true ? true : false;
  const [expanded, setExpanded] = React.useState(initialIsExpanded);

  const textContainer = useAppSelector((state) => state.language.textContainer);

  const starsRatingTextContainer = [
    textContainer.generalProductRating,
    textContainer.userInterface,
    textContainer.manufacturingQuality,
    textContainer.priceQuality,
    textContainer.camera,
    textContainer.callsQuality,
    textContainer.battery,
  ];

  const [croppedText, setCroppedText] = React.useState({
    pros: "",
    cons: "",
    endOfText: false,
  });

  React.useEffect(() => {
    if (!fullScreen) {
      setCroppedText(
        cropText(
          pros,
          cons,
          MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
        )
      );
    } else {
      setCroppedText({ pros: pros, cons: cons, endOfText: true });
    }
  }, []);

  const navigateToFullScreen = () => {
    fullScreenFn();
    if (!fullScreen) navigate(fullScreenRoute);
  };

  const handleSeeMoreExpansion = () => {
    if (croppedText.endOfText) {
      // shrink
      setExpanded(false);
      setCroppedText(
        cropText(
          pros,
          cons,
          MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
        )
      );
    } else if (expanded) {
      // expand to infinity
      // setExpanded(true);
      // setCroppedText(cropText(pros, cons, 10000, 10000));
      navigateToFullScreen();
    } else {
      // expand to limit
      setExpanded(true);
      setCroppedText(
        cropText(
          pros,
          cons,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
        )
      );
    }
  };

  const handleExpandClick = () => {
    if (expanded) {
      // shrink
      setExpanded(false);
      setCroppedText(
        cropText(
          pros,
          cons,
          MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
        )
      );
    } else {
      // expand to limit
      seeMoreFn();
      setExpanded(true);
      setCroppedText(
        cropText(
          pros,
          cons,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
        )
      );
    }
  };
  const cardMainContent = () => {
    return (
      <React.Fragment>
        {/* General stars rating */}
        <StarLine
          label={
            isPhoneReview
              ? textContainer.generalProductRating
              : textContainer.generalCompanyRating
          }
          value={ratings[0]}
        />
        {/* stars rating */}
        {isPhoneReview && (
          <div>
            <FullStars
              starsRatingTextContainer={starsRatingTextContainer}
              expanded={expanded}
              index={index}
              ratings={ratings}
              isFullScreen={fullScreen}
            />
          </div>
        )}
        <ProsConsText
          expanded={expanded}
          croppedText={croppedText}
          prosTitle={`${textContainer.pros}:`}
          consTitle={`${textContainer.cons}:`}
        />
      </React.Fragment>
    );
  };

  return (
    <Card
      key={ukey}
      reviewIcon={true}
      tooltipTitle={
        isPhoneReview
          ? textContainer.productReview
          : textContainer.companyReview
      }
      disableElevation={disableElevation}
    >
      <CardHeader
        userAvatar={reviewDetails.picture}
        userName={userName}
        avatarRadius={USER_CIRCLE_AVATAR_LARGE}
        productName={productName}
        reviewDate={reviewDetails.createdAt}
        buyDate={isPhoneReview && reviewDetails.ownedAt}
        userId={reviewDetails.userId}
        targetId={reviewDetails.targetId}
        showViewsCounter={true}
        views={reviewDetails.views}
        targetProfilePath={targetProfilePath}
        userProfilePath={userProfilePath}
        actionBtnFunction={actionBtnFunction}
        reportFunction={reportFunction}
        verificationRatio={verificationRatio}
        verifyPhone={verifyPhone}
      />

      {/* card main content */}

      <ButtonBase
        disabled={
          fullScreen ||
          (isCompany &&
            cons.length + pros.length < MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND)
        }
        component="div"
        style={{
          display: "block",
          cursor: "pointer",
          padding: "0px 16px",
          "&:hover": { background: "#000" },
        }}
        onClick={
          fullScreen
            ? null
            : () => {
                handleExpandClick();
              }
        }
      >
        {cardMainContent()}
      </ButtonBase>

      <CardContent style={{ padding: 0 }}>
        {fullScreen ? (
          <></>
        ) : (
          <Box style={{ padding: "0px 16px" }}>
            {/* see more button */}
            {croppedText.endOfText === false || expanded ? (
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={handleSeeMoreExpansion}
              >
                <Typography
                  sx={{ textDecoration: "underline" }}
                  variant="S18W800C050505"
                >
                  {croppedText.endOfText
                    ? textContainer.seeLess
                    : expanded
                    ? textContainer.seeMore
                    : textContainer.seeMore}
                </Typography>
              </div>
            ) : (
              <></>
            )}
          </Box>
        )}

        <Box
          style={{
            padding: "0px 16px",
          }}
        >
          <CardFooter
            isReview={isReview}
            navigateToFullScreen={!fullScreen ? navigateToFullScreen : () => {}}
            shareCounter={reviewDetails.shares}
            likesCounter={reviewDetails.likes}
            commentsCounter={reviewDetails.commentsCount}
          />
          {/* divider */}
          <Divider
            variant="fullWidth"
            sx={{
              padding: 0,
              margin: 0,
              backgroundColor: theme.palette.divider,
            }}
          />
          <CardActionButtons
            isReview={isReview}
            textContainer={textContainer}
            toggleLike={likeBtnHandler}
            isLiked={isLiked}
            firstButtonNonPressedText={textContainer.like}
            firstButtonPressedText={textContainer.liked}
            navigateToFullScreen={!fullScreen ? navigateToFullScreen : () => {}}
            shareBtnHandler={shareBtnFn}
            isReview={true}
          />
          {showBottomLine && (
            // divider
            <Divider
              variant="fullWidth"
              sx={{
                padding: 0,
                margin: 0,
                backgroundColor: theme.palette.divider,
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
