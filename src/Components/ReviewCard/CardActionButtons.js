import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CardActions from "@mui/material/CardActions";
import * as React from "react";
import BottomCardActionBtn from "./BottomCardActionBtn";

const CardActionButtons = ({textContainer, isLiked, setIsLiked}) => {
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
            isLiked
              ? textContainer.reviewCard.actions.liked
              : textContainer.reviewCard.actions.like
          }
          icon={
            isLiked ? (
              <ThumbUpIcon fontSize="medium" />
            ) : (
              <ThumbUpAltOutlinedIcon fontSize="medium" />
            )
          }
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
