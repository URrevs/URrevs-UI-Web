import { default as MUICardHeader } from "@mui/material/CardHeader";

import CircleAvatar from "./CircleAvatar";
import ActionButton from "./ActionButton";
import CardSubheader from "./CardHeader_Subheader";
import CardHeaderTitle from "./CardHeader_Title";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { useTheme } from "@emotion/react";

const CardHeader = ({
  userAvatar,
  avatarRadius,
  userName,
  productName,
  reviewDate,
  buyDate,
  showViewsCounter,
}) => {
  const theme = useTheme();

  return (
    <div>
      <MUICardHeader
        sx={{
          paddingBottom: 1,
        }}
        avatar={
          <CircleAvatar userAvatar={userAvatar} avatarRadius={avatarRadius} />
        }
        action={<ActionButton />}
        title={
          <CardHeaderTitle userName={userName} productName={productName} />
        }
        subheader={
          <CardSubheader
            reviewDate={reviewDate}
            buyDate={buyDate}
            showViewsCounter={showViewsCounter}
          />
        }
      />
      <div
        style={{
          position: "absolute",
          left: theme.direction === "rtl" ? "10px" : "auto",
          right: theme.direction === "rtl" ? "auto" : "10px",
          top: "0px",
          transform:
            theme.direction === "rtl" ? "rotate(-45deg)" : "rotate(45deg)",
          backgroundColor: theme.palette.background.default,
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HelpOutlineOutlinedIcon
          style={{
            color: theme.palette.reviewCard.indicatorColor,
            borderRadius: "50%",
            backgroundColor: theme.palette.background.default,
            width: "20px",
            height: "20px",
          }}
        />
      </div>
    </div>
  );
};

export default CardHeader;
