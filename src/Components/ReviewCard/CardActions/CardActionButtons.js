import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CardActions from "@mui/material/CardActions";
import * as React from "react";
import BottomCardActionBtn from "./BottomCardActionBtn";

const CardActionButtons = ({
  textContainer,
  isLiked,
  // text shown on first button (Like or Upvote)
  firstButtonPressedText,
  // text shown on first button (Liked or Upvote)
  firstButtonNonPressedText,
  toggleLike,
  isReview,
  navigateToFullScreen: commentButtonOnClick,
  shareBtnHandler,
  isFullScreen,
}) => {
  const activeFirstIcon = isReview ? (
    <ThumbUpIcon fontSize="medium" />
  ) : (
    <FontAwesomeIcon icon={faUpLong} />
  );
  const nonActiveFirstIcon = isReview ? (
    <ThumbUpAltOutlinedIcon fontSize="medium" />
  ) : (
    <FontAwesomeIcon icon={faUpLong} />
  );

  return (
    <div>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          padding: "0px 0px",
        }}
      >
        <BottomCardActionBtn
          onClickAction={toggleLike}
          isHighlighted={isLiked}
          title={
            isReview
              ? isLiked
                ? firstButtonPressedText
                : firstButtonNonPressedText
              : isLiked
              ? firstButtonPressedText
              : firstButtonNonPressedText
          }
          icon={isLiked ? activeFirstIcon : nonActiveFirstIcon}
        />

        <BottomCardActionBtn
          onClickAction={commentButtonOnClick}
          title={isReview ? textContainer.comment : textContainer.answer}
          icon={<ChatBubbleOutlineOutlinedIcon fontSize="medium" />}
        />

        <BottomCardActionBtn
          onClickAction={shareBtnHandler}
          title={textContainer.share}
          icon={<ShareOutlinedIcon fontSize="medium" />}
        />
      </CardActions>
    </div>
  );
};

export default CardActionButtons;
