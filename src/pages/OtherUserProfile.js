import { useTheme } from "@emotion/react";
import DevicesOtherOutlinedIcon from "@mui/icons-material/DevicesOtherOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { Avatar, Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import StarWithCount from "../Components/Leaderboard/StarWithCount";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ListItemNavigator from "../Components/Shared/ListItemNavigator";
import ROUTES_NAMES from "../RoutesNames";
import { useGetOtherUserProfileQuery } from "../services/users";
import { useAppSelector } from "../store/hooks";
import ErrorScreen from "./ErrorScreen";

export default function OtherUserProfilePage({ uid }) {
  const {
    isLoading,
    isError,
    data: profileData,
  } = useGetOtherUserProfileQuery(uid);
  const theme = useTheme();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionry = {
    collectedStars: textContainer.collectedStars,
    myReviews: textContainer.reviews,
    ownedProducts: textContainer.ownedProducts,
    askedQuestions: textContainer.askedQuestions,
    account: textContainer.userProfile,
  };

  const listItems = [
    {
      title: pageDictionry.myReviews,
      icon: (
        <RateReviewOutlinedIcon
          sx={{ fontSize: 40, color: theme.palette.iconColor }}
        />
      ),
      to: `../../${ROUTES_NAMES.USER_PROFILE}/${ROUTES_NAMES.REVIEWS}?userId=${uid}`,
    },
    {
      title: pageDictionry.ownedProducts,
      icon: (
        <DevicesOtherOutlinedIcon
          sx={{ fontSize: 40, color: theme.palette.iconColor }}
        />
      ),
      to: `../../${ROUTES_NAMES.USER_PROFILE}/${ROUTES_NAMES.OWNED_PHONES}?userId=${uid}`,
    },
    {
      title: pageDictionry.askedQuestions,
      icon: (
        <ForumOutlinedIcon
          sx={{ fontSize: 40, color: theme.palette.iconColor }}
        />
      ),
      subtitle: pageDictionry.helpOthers,
      to: `../../${ROUTES_NAMES.USER_PROFILE}/${ROUTES_NAMES.QUESTIONS}?userId=${uid}`,
    },
  ];

  const listItem = (title, subTitle, icon, to) => {
    return (
      <ListItemNavigator
        title={title}
        subTitle={subTitle}
        icon={icon}
        to={to}
      />
    );
  };

  const userPhoto = () => {
    return (
      <Avatar
        src={profileData.photo}
        alt="User profile picture"
        sx={{ width: 90, height: 90 }}
      >
        <Avatar />
      </Avatar>
    );
  };

  const userName = () => {
    return <Typography variant="S22W700C050505">{profileData.name}</Typography>;
  };

  return (
    <CustomAppBar
      showLabel={true}
      label={pageDictionry.account}
      showBackBtn={true}
    >
      <div style={{ height: "12px" }}></div>
      <FixedGrid>
        {isError ? (
          <ErrorScreen>error</ErrorScreen>
        ) : !isLoading ? (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {/* User photo */}
              {userPhoto()}

              {/* User name */}
              {userName()}

              {/* Collected stars */}
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="S20W400C65676B">
                  {pageDictionry.collectedStars}
                </Typography>
                <div style={{ width: "12px" }}></div>
                <StarWithCount
                  value={profileData.points}
                  starSize={34}
                  textStyle="S20W400C65676B"
                />
              </Box>
              <div style={{ height: 20 }}></div>
            </div>
            <div>
              <List>
                {listItems.map((item, index) => {
                  return listItem(
                    item.title,
                    item.subtitle,
                    item.icon,
                    item.to
                  );
                })}
              </List>
            </div>
          </div>
        ) : (
          <></>
          // <div>Loading...</div>
        )}
      </FixedGrid>
    </CustomAppBar>
  );
}
