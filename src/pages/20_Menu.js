import { useTheme } from "@emotion/react";
import DevicesOtherOutlinedIcon from "@mui/icons-material/DevicesOtherOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ROUTES_NAMES from "../RoutesNames";
import {
  Avatar,
  Box,
  ListItemText,
  ListItem,
  ListItemButton,
  Typography,
  Modal,
} from "@mui/material";
import { List } from "@mui/material/";
import React from "react";
import StarWithCount from "../Components/Leaderboard/StarWithCount";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ListItemNavigator from "../Components/Shared/ListItemNavigator";
import { useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";
import FacebookIcon from "../Components/Icons/FacebookIcon";
import LinkedIn from "../Components/Icons/LinkedIn";
import { SignoutDialog } from "../Components/Dialogs/SignoutDialog";

export default function Menu() {
  const theme = useTheme();

  const currentUserProfile = useAppSelector((state) => state.auth);
  const profileData = currentUserProfile;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    settings: textContainer.settings,
    aboutUs: textContainer.aboutUs,
    contactUs: "تواصل معنا",
    followUs: "تابعنا",
    logOut: textContainer.logOut,
    termsAndAgreements: textContainer.termsOfUse,
    privacyPolicy: textContainer.privacyPolicy,
  };

  const listItems = [
    {
      title: pageDictionry.myReviews,
      icon: <RateReviewOutlinedIcon sx={{ fontSize: 40 }} />,
      to: `../../${ROUTES_NAMES.USER_PROFILE}/${ROUTES_NAMES.MY_REVIEWS}/${ROUTES_NAMES.MY_PHONE_REVIEWS}`,
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
      onClick: () => navigator.clipboard.writeText(profileData.refCode),
      subtitle: pageDictionry.inviteFriends,
    },
    {
      title: pageDictionry.adminPanel,
      icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: "",
      to: `../../${ROUTES_NAMES.ADMIN_PANEL}`,
    },
    {
      title: pageDictionry.settings,
      icon: <SettingsOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: "",
      to: "",
    },
    {
      title: pageDictionry.aboutUs,
      icon: <ErrorOutlineOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: "",
      to: "",
    },
    {
      title: pageDictionry.contactUs,
      icon: <ContactMailOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: "",
      to: "",
    },
    {
      title: pageDictionry.logOut,
      icon: <LogoutOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: "",
      onClick: () => {
        handleOpen();
      },
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
      to={`../../${ROUTES_NAMES.USER_PROFILE}?uid=${profileData.uid}`}
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
        <ListItemButton sx={{ padding: 0 }}>
          {userProfile()}
          <ListItemText
            primaryTypographyProps={{ ...theme.typography.S20W700C050505 }}
            primary={profileData.name}
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
  const listItem = (title, subTitle, icon, to, onClick) => {
    return (
      <ListItemNavigator
        title={title}
        subTitle={subTitle}
        icon={icon}
        to={to}
        onClick={onClick}
      />
    );
  };

  return (
    <Box
      style={{
        marginBottom: 70,
      }}
    >
      <CustomAppBar showLogo showSearch showProfile />

      <Modal open={open} onClose={handleClose} dir={theme.direction}>
        <Box>
          <SignoutDialog handleClose={handleClose} />
        </Box>
      </Modal>
      <List>
        {useProfileButton()}
        <Box style={{ height: 12 }}></Box>
        {listItems.map((item, index) => {
          return (
            <div key={item.title + index}>
              {listItem(
                item.title,
                item.subtitle,
                item.icon,
                item.to,
                item.onClick
              )}
            </div>
          );
        })}
      </List>
      <Box sx={{ paddingTop: "20px" }}>
        <Typography variant="S22W500C050505">{`${pageDictionry.followUs}:`}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <FacebookIcon />
            <LinkedIn />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Link to="/">
              <Typography underline="always">
                {pageDictionry.termsAndAgreements}
              </Typography>
            </Link>
            <Typography variant="S16W400C050505">•</Typography>
            <Link to="/">
              <Typography underline="always">
                {pageDictionry.privacyPolicy}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
