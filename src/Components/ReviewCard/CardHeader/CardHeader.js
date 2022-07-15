import { useTheme } from "@emotion/react";
import { default as MUICardHeader } from "@mui/material/CardHeader";
import ActionButton from "./ActionButton";
import CardSubheader from "./CardHeader_Subheader";
import CardHeaderTitle from "./CardHeader_Title";
import CircleAvatar from "./CircleAvatar";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

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
  verificationRatio,
  verifyPhone,
}) => {
  const currentUser = useAppSelector((state) => state.auth);

  const action = () => {
    if (actionBtnFunction) {
      if (userId === currentUser.uid) {
        if (verificationRatio !== 0) {
          return <></>;
        } else {
          return (
            <ActionButton
              actionBtnFunction={actionBtnFunction}
              reportFunction={reportFunction}
              verificationRatio={verificationRatio}
              userId={userId}
              verifyPhone={verifyPhone}
            />
          );
        }
      } else {
        return (
          <ActionButton
            actionBtnFunction={actionBtnFunction}
            reportFunction={reportFunction}
            verificationRatio={null}
            userId={userId}
            verifyPhone={verifyPhone}
          />
        );
      }
      return <></>;
    }
  };

  return (
    <MUICardHeader
      sx={{
        paddingBottom: 1,
      }}
      avatar={
        <Link to={userProfilePath}>
          <CircleAvatar
            userName={userName}
            userAvatar={userAvatar}
            avatarRadius={avatarRadius}
          />
        </Link>
      }
      action={action()}
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
          verificationRatio={verificationRatio}
        />
      }
    />
  );
};

export default CardHeader;
