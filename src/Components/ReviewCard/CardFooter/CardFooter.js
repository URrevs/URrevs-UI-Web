import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import * as React from "react";
import FooterButton from "./FooterButton";
import { useTheme } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";

const CardFooter = ({ isReview }) => {
  const theme = useTheme();
  const iconStyle = {
    color: theme.palette.reviewCard.actionBtnIcon,
    fontSize: "20px",
  };
  const firstIcon = isReview ? (
    <ThumbUpAltOutlinedIcon style={iconStyle} />
  ) : (
    <FontAwesomeIcon style={iconStyle} icon={faUpLong} />
  );

  return (
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
  );
};

export default CardFooter;
