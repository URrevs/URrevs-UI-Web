import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import * as React from "react";
import FooterButton from "./FooterButton";
import { useTheme } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Divider } from "@mui/material";
import { useConvertNumberToHumanLanguage } from "../../../hooks/useMillify";

const CardFooter = ({
  isReview,
  navigateToFullScreen: commentOnClickHandler,
  shareCounter,
  likesCounter,
  commentsCounter,
  shareBtnHandler,
}) => {
  const theme = useTheme();
  const iconStyle = {
    color: theme.palette.reviewCard.actionBtnIcon,
    fontSize: "20px",
  };
  const firstIcon = isReview ? (
    <ThumbUpIcon
      style={{
        ...iconStyle,
        color: theme.palette.reviewCard.actionBtnIconHighlight,
      }}
    />
  ) : (
    <FontAwesomeIcon
      style={{
        ...iconStyle,
        color: theme.palette.reviewCard.actionBtnIconHighlight,
      }}
      icon={faUpLong}
    />
  );
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "8px 0px 6px 0px",
        }}
      >
        <FooterButton
          icon={firstIcon}
          number={useConvertNumberToHumanLanguage(likesCounter)}
          isClickable={false}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FooterButton
            icon={<ChatBubbleOutlineOutlinedIcon style={iconStyle} />}
            number={useConvertNumberToHumanLanguage(commentsCounter)}
            isClickable={true}
            onClickHandler={commentOnClickHandler}
          />
          <div style={{ width: "10px" }}></div>
          {/* share btn */}
          <FooterButton
            icon={<ShareOutlinedIcon style={iconStyle} />}
            number={useConvertNumberToHumanLanguage(shareCounter)}
            isClickable={false}
          />
        </div>
      </div>
     
    </div>
  );
};

export default CardFooter;
