import { useTheme } from "@emotion/react";
import DevicesOtherOutlinedIcon from "@mui/icons-material/DevicesOtherOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import ROUTES_NAMES from "../RoutesNames";
import {
  Avatar,
  Box,
  ListItemText,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { List } from "@mui/material/";
import React from "react";
import StarWithCount from "../Components/Leaderboard/StarWithCount";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ListItemNavigator from "../Components/Shared/ListItemNavigator";
import { useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";

export default function Menu() {
  const theme = useTheme();

  const currentUserProfile = useAppSelector((state) => state.auth);
  const profileData = currentUserProfile;

  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionry = {
    collectedStars: textContainer.collectedStars,
    myReviews: textContainer.myReviews,
    myQuestions: textContainer.myQuestions,
    ownedProducts: textContainer.ownedProducts,
    referalCode: textContainer.yourInvitationCode,
    askedQuestions: textContainer.questionsOnMyProducts,
    inviteFriends: textContainer.inviteYourFriendsToWriteTheirReviews,
    helpOthers: textContainer.helpOthersAndGetPoints,
    adminPanel: textContainer.adminPanel,
  };

  const listItems = [
    {
      title: pageDictionry.myReviews,
      icon: <RateReviewOutlinedIcon sx={{ fontSize: 40 }} />,
      to: "",
    },
    {
      title: pageDictionry.myQuestions,
      icon: <ForumOutlinedIcon sx={{ fontSize: 40 }} />,
      to: "",
    },
    {
      title: pageDictionry.ownedProducts,
      icon: <DevicesOtherOutlinedIcon sx={{ fontSize: 40 }} />,
      to: `../../${ROUTES_NAMES.USER_PROFILE}/${ROUTES_NAMES.OWNED_PHONES}?uid=${profileData.uid}`,
    },
    {
      title: pageDictionry.askedQuestions,
      icon: <HelpCenterOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: pageDictionry.helpOthers,
      to: "",
    },
    {
      title: pageDictionry.referalCode,
      icon: <GroupsOutlinedIcon sx={{ fontSize: 40 }} />,
      to: "",
      subtitle: pageDictionry.inviteFriends,
    },
    {
      title: pageDictionry.adminPanel,
      icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: "",
      to: `../../${ROUTES_NAMES.ADMIN_PANEL}`,
    },
  ];
  const userProfile = () => (
    <Avatar
      src={profileData.photo}
      alt="User profile picture"
      sx={{ mr: "8px" }}
    ></Avatar>
  );
  const useProfileButton = () => (
    <Link
      to={ROUTES_NAMES.USER_PROFILE}
      style={{
        background: "none",
        textDecoration: "none",
        "&:hover": {
          backgroundColor: theme.palette.hover,
          color: "black",
        },
        "&:active": {
          backgroundColor: theme.palette.hover,
        },
        "&:focus": {
          backgroundColor: theme.palette.hover,
        },
      }}
    >
      <ListItem
        disablePadding
        dense
        style={{
          "&:hover": {
            backgroundColor: theme.palette.hover,
          },
          "&:active": {
            backgroundColor: theme.palette.hover,
          },
          "&:focus": {
            backgroundColor: theme.palette.hover,
          },
        }}
      >
        <ListItemButton>
          {userProfile()}
          <ListItemText
            primaryTypographyProps={{ ...theme.typography.S20W700C050505 }}
            primary={"Omar Gamal"}
            secondaryTypographyProps={{
              ...theme.typography.S16W400C65676B,
            }}
            secondary={""}
          />
          <StarWithCount
            value={profileData.points}
            starSize={34}
            textStyle="S20W400C65676B"
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
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

  return (
    <Box
      style={{
        marginBottom: 70,
      }}
    >
      <List>
        {useProfileButton()}
        {listItems.map((item, index) => {
          return listItem(item.title, item.subtitle, item.icon, item.to);
        })}
      </List>
    </Box>
  );
}
