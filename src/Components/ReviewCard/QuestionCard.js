import { useTheme } from "@emotion/react";
import { Box, ButtonBase, Divider, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND,
  MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND,
  USER_CIRCLE_AVATAR_LARGE,
} from "../../constants";
import { cropText } from "../../functions/cropText";
import { useAppSelector } from "../../store/hooks";
import Card from "../Card";
import CardActionButtons from "./CardActions/CardActionButtons";
import ProsConsText from "./CardBody/ProsConsText";
import CardFooter from "./CardFooter/CardFooter";
import CardHeader from "./CardHeader/CardHeader";

export default function QuestionCard({
  ukey,
  clearIndexCache,
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
  acceptedAnswerWidget = null,
  fullScreenFn,
  shareBtnFn,
  disableElevation,
  showBottomLine,
}) {
  const isReview = true;

  const theme = useTheme();

  const navigate = useNavigate();

  const isLiked = reviewDetails.upvoted;

  const content = reviewDetails.content;

  const userName = reviewDetails.userName;

  const productName = reviewDetails.targetName;

  const initialIsExpanded = isExpanded === true ? true : false;
  const [expanded, setExpanded] = React.useState(initialIsExpanded);

  const textContainer = useAppSelector((state) => state.language.textContainer);

  const [croppedText, setCroppedText] = React.useState({
    pros: "",
    cons: "",
    endOfText: false,
  });

  React.useEffect(() => {
    if (!fullScreen) {
      setCroppedText(
        cropText(
          content,
          "",
          MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
        )
      );
      clearIndexCache(index);
    } else {
      setCroppedText({ pros: content, cons: "", endOfText: true });
    }
  }, []);

  const navigateToFullScreen = () => {
    if (!fullScreen) navigate(fullScreenRoute);
    fullScreenFn();
  };

  const handleSeeMoreExpansion = () => {
    clearIndexCache(index);
    if (croppedText.endOfText) {
      // shrink
      setExpanded(false);
      setCroppedText(
        cropText(
          content,
          "",
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
          content,
          "",
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
        )
      );
    }
  };

  const handleExpandClick = () => {
    clearIndexCache(index);
    if (expanded) {
      // shrink
      setExpanded(false);
      setCroppedText(
        cropText(
          content,
          "",
          MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
        )
      );
    } else {
      // expand to limit
      setExpanded(true);
      setCroppedText(
        cropText(
          content,
          "",
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
        )
      );
    }
  };

  return (
    <Card
      disableElevation={disableElevation}
      key={ukey}
      reviewIcon={false}
      tooltipTitle={
        isPhoneReview
          ? textContainer.askedQuestion
          : textContainer.companyReview
      }
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
        targetProfilePath={targetProfilePath}
        userProfilePath={userProfilePath}
        actionBtnFunction={actionBtnFunction}
        reportFunction={reportFunction}
      />
      <CardContent style={{ padding: 0 }}>
        <ButtonBase
          component="div"
          style={{
            display: "block",
            padding: "0px 16px",
            cursor: "pointer",
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
          <ProsConsText croppedText={croppedText} prosTitle="" consTitle="" />
        </ButtonBase>

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
            isReview={false}
            navigateToFullScreen={navigateToFullScreen}
            shareCounter={reviewDetails.shares}
            likesCounter={reviewDetails.upvotes}
            commentsCounter={reviewDetails.ansCount}
          />

          <Divider
            variant="fullWidth"
            sx={{
              padding: 0,
              margin: 0,
              backgroundColor: theme.palette.divider,
            }}
          />

          <CardActionButtons
            isReview={false}
            textContainer={textContainer}
            toggleLike={likeBtnHandler}
            isLiked={isLiked}
            firstButtonNonPressedText={textContainer.vote}
            firstButtonPressedText={textContainer.vote}
            navigateToFullScreen={navigateToFullScreen}
            shareBtnHandler={shareBtnFn}
            isReview={false}
          />

          {(showBottomLine || acceptedAnswerWidget) && (
            // divider
            <Divider
              variant="fullWidth"
              sx={{
                padding: 0,
                margin: 0,
                backgroundColor: theme.palette.divider,
                marginBottom: "16px",
              }}
            />
          )}
        </Box>
        {acceptedAnswerWidget && (
          <Link to={fullScreenRoute} style={{ textDecoration: "none" }}>
            {acceptedAnswerWidget()}
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
