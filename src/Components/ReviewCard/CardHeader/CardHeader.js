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
    <MUICardHeader
      sx={{
        paddingBottom: 1,
      }}
      avatar={
        <CircleAvatar userAvatar={userAvatar} avatarRadius={avatarRadius} />
      }
      action={<ActionButton />}
      title={<CardHeaderTitle userName={userName} productName={productName} />}
      subheader={
        <CardSubheader
          reviewDate={reviewDate}
          buyDate={buyDate}
          showViewsCounter={showViewsCounter}
        />
      }
    />
  );
};

export default CardHeader;
