import { useTheme } from "@emotion/react";
import { default as MUICardHeader } from "@mui/material/CardHeader";
import ActionButton from "./ActionButton";
import CardSubheader from "./CardHeader_Subheader";
import CardHeaderTitle from "./CardHeader_Title";
import CircleAvatar from "./CircleAvatar";
import { Link } from "react-router-dom";

const CardHeader = ({
  userAvatar,
  avatarRadius,
  userName,
  productName,
  reviewDate,
  buyDate,
  showViewsCounter,
  views,
  userId,
  targetId,
  userProfilePath,
  targetProfilePath,
  actionBtnFunction,
  reportFunction,
}) => {
  const theme = useTheme();

  return (
    <MUICardHeader
      sx={{
        paddingBottom: 1,
      }}
      avatar={
        <Link to={userProfilePath}>
          <CircleAvatar userAvatar={userAvatar} avatarRadius={avatarRadius} />
        </Link>
      }
      action={
        actionBtnFunction && (
          <ActionButton
            actionBtnFunction={actionBtnFunction}
            reportFunction={reportFunction}
          />
        )
      }
      title={
        <CardHeaderTitle
          userProfilePath={userProfilePath}
          targetProfilePath={targetProfilePath}
          userName={userName}
          productName={productName}
          userId={userId}
          targetId={targetId}
        />
      }
      subheader={
        <CardSubheader
          reviewDate={reviewDate}
          buyDate={buyDate}
          showViewsCounter={showViewsCounter}
          views={views}
        />
      }
    />
  );
};

export default CardHeader;
