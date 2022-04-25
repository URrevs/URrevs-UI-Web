import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CardActions from "@mui/material/CardActions";
import * as React from "react";
import BottomCardActionBtn from "./BottomCardActionBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";

const CardActionButtons = ({
  textContainer,
  isLiked,
  setIsLiked,
  isReview,
}) => {
  console.log(isReview);
  const activeFirstIcon = () =>
    isReview ? (
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
          onClickAction={() => setIsLiked(!isLiked)}
          isHighlighted={isLiked}
          title={
            isReview
              ? isLiked
                ? textContainer.reviewCard.actions.liked
                : textContainer.reviewCard.actions.like
              : isLiked
              ? textContainer.reviewCard.actions.liked
              : textContainer.reviewCard.actions.like
          }
          icon={nonActiveFirstIcon}
        />

        <BottomCardActionBtn
          title={textContainer.reviewCard.actions.comment}
          icon={<ChatBubbleOutlineOutlinedIcon fontSize="medium" />}
        />

        <BottomCardActionBtn
          title={textContainer.reviewCard.actions.share}
          icon={<ShareOutlinedIcon fontSize="medium" />}
        />
      </CardActions>
    </div>
  );
};

export default CardActionButtons;
