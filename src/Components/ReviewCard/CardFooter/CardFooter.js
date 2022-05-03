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

const CardFooter = ({ isReview }) => {
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
        <FooterButton icon={firstIcon} number={100} isClickable={false} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FooterButton
            icon={<ChatBubbleOutlineOutlinedIcon style={iconStyle} />}
            number={100}
            isClickable={true}
          />
          <div style={{ width: "10px" }}></div>
          <FooterButton
            icon={<ShareOutlinedIcon style={iconStyle} />}
            number={100}
            isClickable={false}
          />
        </div>
      </div>
      {/* divider */}
      <Divider
        variant="fullWidth"
        sx={{
          padding: 0,
          margin: 0,
          backgroundColor: theme.palette.divider,
        }}
      />
    </div>
  );
};

export default CardFooter;
