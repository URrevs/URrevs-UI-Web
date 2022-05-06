import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import StarWithCount from "../Components/Leaderboard/StarWithCount";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { useAppSelector } from "../store/hooks";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import { useTheme } from "@emotion/react";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import DevicesOtherOutlinedIcon from "@mui/icons-material/DevicesOtherOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import { Link, Outlet } from "react-router-dom";
import ROUTES_NAMES from "../RoutesNames";
import { useGetOtherUserProfileQuery } from "../services/users";

export default function OtherUserProfilePage({ uid }) {
  const theme = useTheme();

  const {
    isLoading,
    isError,
    isFetching,
    data: profileData,
  } = useGetOtherUserProfileQuery(uid);

  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionry = {
    collectedStars: textContainer.collectedStars,
    myReviews: textContainer.reviews,
    ownedProducts: textContainer.ownedProducts,
    askedQuestions: textContainer.askedQuestions,
  };

  const listItems = [
    {
      title: pageDictionry.myReviews,
      icon: <RateReviewOutlinedIcon sx={{ fontSize: 40 }} />,
      to: "",
    },
    {
      title: pageDictionry.ownedProducts,
      icon: <DevicesOtherOutlinedIcon sx={{ fontSize: 40 }} />,
      to: `${ROUTES_NAMES.OWNED_PHONES}?uid=${uid}`,
    },
    {
      title: pageDictionry.askedQuestions,
      icon: <ForumOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: pageDictionry.helpOthers,
      to: "",
    },
  ];

  const listItem = (title, subTitle, icon, to) => {
    return (
      <Link to={to} style={{ textDecoration: "none" }}>
        <ListItem disablePadding dense key={title}>
          <ListItemButton
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.hover,
              },
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ ...theme.typography.S20W700C050505 }}
              primary={title}
              secondaryTypographyProps={{ ...theme.typography.S16W400C65676B }}
              secondary={subTitle}
            />
          </ListItemButton>
        </ListItem>
      </Link>
    );
  };

  const userPhoto = () => {
    return (
      <Avatar
        src={profileData.photo}
        alt="User profile picture"
        sx={{ width: 90, height: 90 }}
      ></Avatar>
    );
  };

  const userName = () => {
    return <Typography variant="S22W700C050505">{profileData.name}</Typography>;
  };

  return (
    <CustomAppBar showLabel={true} label="حسابي" showBackBtn={true}>
      {!isLoading && (
        <div
          style={{
            paddingTop: 15,
          }}
        >
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
                value={40000}
                starSize={34}
                textStyle="S20W400C65676B"
              />
            </Box>
            <div style={{ height: 20 }}></div>
          </div>
          <div>
            <List style={{ padding: "0 18px" }}>
              {listItems.map((item, index) => {
                return listItem(item.title, item.subtitle, item.icon, item.to);
              })}
            </List>
          </div>
        </div>
      )}
    </CustomAppBar>
  );
}
