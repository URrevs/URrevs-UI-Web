import { useTheme } from "@emotion/react";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import DevicesOtherOutlinedIcon from "@mui/icons-material/DevicesOtherOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Avatar,
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { List } from "@mui/material/";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { InvitationDialog } from "../Components/Dialogs/InvitationDialog";
import { SignoutDialog } from "../Components/Dialogs/SignoutDialog";
import FacebookIcon from "../Components/Icons/FacebookIcon";
import LinkedIn from "../Components/Icons/LinkedIn";
import StarWithCount from "../Components/Leaderboard/StarWithCount";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { SettingsSideBar } from "../Components/MainLayout/Drawer/Sidebar/SettingsSideBar";
import ListItemNavigator from "../Components/Shared/ListItemNavigator";
import ROUTES_NAMES from "../RoutesNames";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { menuActions } from "../store/uiMenuSlice";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { ConditionalLink } from "../Components/ConditionalLink";
import { useGetCurrentUserProfileMutation } from "../services/users";
import { useEffect } from "react";
import { authActions } from "../store/authSlice";
import GoogleBadge from "../Components/Icons/GooglePlayStoreBadge";

export default function Menu({ isDesktop = false, drawerRef }) {
  const theme = useTheme();

  const [getUserProfile] = useGetCurrentUserProfileMutation();

  const currentUserProfile = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profileData = currentUserProfile;
  const [signOutDialog, setSignOutDialog] = React.useState(false);
  const [invitationCodeDialog, setInvitationCodeDialog] = React.useState(false);
  const [settingsSlide, setSettingsSlide] = React.useState(false);
  const handleSignOutOpen = () => setSignOutDialog(true);
  const handleSignOutClose = () => setSignOutDialog(false);
  const handleInvitationOpen = () => setInvitationCodeDialog(true);
  const handleInvitationClose = () => setInvitationCodeDialog(false);

  useEffect(() => {
    if (currentUserProfile.isLoggedIn) {
      getUserProfile().then((data) => {
        dispatch(
          authActions.login({
            ...profileData,
            points: data.data.points,
          })
        );
      });
    }
  }, []);

  const textContainer = useAppSelector((state) => state.language.textContainer);
  const language = useAppSelector((state) => state.language.language);

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
    contactUs: textContainer.contactUs,
    followUs: textContainer.followUs,
    logOut: textContainer.logOut,
    termsAndAgreements: textContainer.termsOfUse,
    privacyPolicy: textContainer.privacyPolicy,
  };

  const listItems = [
    {
      title: pageDictionry.myReviews,
      icon: (
        <RateReviewOutlinedIcon
          sx={{ fontSize: 40, color: theme.palette.iconColor }}
        />
      ),
      to: `../../${ROUTES_NAMES.USER_PROFILE}/${ROUTES_NAMES.REVIEWS}?userId=${currentUserProfile.uid}`,
      authenticate: currentUserProfile.isLoggedIn,
    },
    {
      title: pageDictionry.myQuestions,
      icon: (
        <ForumOutlinedIcon
          sx={{ fontSize: 40, color: theme.palette.iconColor }}
        />
      ),
      to: `../../${ROUTES_NAMES.USER_PROFILE}/${ROUTES_NAMES.QUESTIONS}?userId=${currentUserProfile.uid}`,
      authenticate: currentUserProfile.isLoggedIn,
    },
    {
      title: pageDictionry.ownedProducts,
      icon: (
        <DevicesOtherOutlinedIcon
          sx={{ fontSize: 40, color: theme.palette.iconColor }}
        />
      ),
      to: `../../${ROUTES_NAMES.USER_PROFILE}/${ROUTES_NAMES.OWNED_PHONES}?userId=${profileData.uid}`,
      authenticate: currentUserProfile.isLoggedIn,
    },
    {
      title: pageDictionry.askedQuestions,
      icon: (
        <HelpCenterOutlinedIcon
          sx={{ fontSize: 40, color: theme.palette.iconColor }}
        />
      ),
      subtitle: pageDictionry.helpOthers,
      to: `../../${ROUTES_NAMES.USER_PROFILE}/${ROUTES_NAMES.MY_QUESTIONS}?userId=${profileData.uid}`,
      authenticate: currentUserProfile.isLoggedIn,
    },
    {
      title: pageDictionry.referalCode,
      icon: (
        <GroupsOutlinedIcon
          sx={{ fontSize: 40, color: theme.palette.iconColor }}
        />
      ),
      onClick: () => {
        handleInvitationOpen();
      },
      subtitle: pageDictionry.inviteFriends,
      authenticate: currentUserProfile.isLoggedIn,
    },
    //Admin panel
    {
      title: pageDictionry.adminPanel,
      icon: (
        <AdminPanelSettingsOutlinedIcon
          sx={{ fontSize: 40, color: theme.palette.iconColor }}
        />
      ),
      subtitle: "",
      to: `../../${ROUTES_NAMES.ADMIN_PANEL}`,
      authenticate: currentUserProfile.isAdmin,
    },
    //Settings
    {
      title: pageDictionry.settings,
      icon: (
        <SettingsOutlinedIcon
          sx={{ fontSize: 40, color: theme.palette.iconColor }}
        />
      ),
      subtitle: "",
      to: `../../${ROUTES_NAMES.SETTINGS}`,
      authenticate: true,
      onClick: () => {
        if (theme.isMobile) navigate(`../../${ROUTES_NAMES.SETTINGS}`);
        else setSettingsSlide(!settingsSlide);
      },
      endIcon: isDesktop ? (
        language === "ar" ? (
          <KeyboardArrowLeftOutlinedIcon
            sx={{ fontSize: 40, color: theme.palette.iconColor }}
          />
        ) : (
          <KeyboardArrowRightOutlined
            sx={{ fontSize: 40, color: theme.palette.iconColor }}
          />
        )
      ) : (
        ""
      ),
    },
    //Aboutus
    {
      title: pageDictionry.aboutUs,
      icon: (
        <ErrorOutlineOutlinedIcon
          sx={{ fontSize: 40, color: theme.palette.iconColor }}
        />
      ),
      subtitle: "",
      to: `../../${ROUTES_NAMES.ABOUT_US}`,
      authenticate: true,
    },
    {
      title: pageDictionry.contactUs,
      icon: (
        <ContactMailOutlinedIcon
          sx={{ fontSize: 40, color: theme.palette.iconColor }}
        />
      ),
      subtitle: "",
      to: "",
      authenticate: true,
    },
    {
      title: pageDictionry.logOut,
      icon: (
        <LogoutOutlinedIcon
          sx={{ fontSize: 40, color: theme.palette.iconColor }}
        />
      ),
      subtitle: "",
      onClick: () => {
        handleSignOutOpen();
      },
      authenticate: currentUserProfile.isLoggedIn,
    },
  ];
  const userProfile = () => (
    <Avatar
      src={profileData.photo}
      alt="User profile picture"
      sx={{ mr: "8px" }}
    >
      <Avatar />
    </Avatar>
  );
  const userProfileButton = () => (
    <Link
      to={`../../${ROUTES_NAMES.USER_PROFILE}?userId=${profileData.uid}`}
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
  const listItem = (
    title,
    subTitle,
    icon,
    to,
    onClick = () => {
      dispatch(menuActions.hideMenu());
      navigate(to);
    },
    endIcon
  ) => {
    return title === pageDictionry.contactUs ? (
      <a
        href="mailto: urrevsofficial@gmail.com"
        style={{ textDecoration: "inherit", color: "inherit" }}
        // underline="always"
      >
        <ListItemNavigator
          title={title}
          subTitle={subTitle}
          icon={icon}
          to={to}
          onClick={onClick}
          endIcon={endIcon}
        />
      </a>
    ) : (
      <ListItemNavigator
        title={title}
        subTitle={subTitle}
        icon={icon}
        to={to}
        onClick={onClick}
        endIcon={endIcon}
      />
    );
  };

  return (
    <React.Fragment>
      {isDesktop ? (
        <SettingsSideBar
          settingsSlide={settingsSlide}
          setSettingsSlide={setSettingsSlide}
          drawerRef={drawerRef}
        />
      ) : null}

      <Box
        style={{
          //Margin from top appbar
          display: "flex",
          flexDirection: "column",
          height: currentUserProfile ? "80vh" : "",
          minHeight: "650px",
          // marginBottom: 70,
          padding: "0px 14px",
        }}
      >
        {theme.isMobile ? (
          <CustomAppBar showLogo showSearch showProfile />
        ) : null}

        <Modal
          open={signOutDialog}
          onClose={handleSignOutClose}
          dir={theme.direction}
        >
          <Box>
            <SignoutDialog handleClose={handleSignOutClose} />
          </Box>
        </Modal>
        <Modal
          open={invitationCodeDialog}
          onClose={handleInvitationClose}
          dir={theme.direction}
        >
          <Box>
            <InvitationDialog handleClose={handleInvitationClose} />
          </Box>
        </Modal>
        <List>
          <Stack spacing={1}>
            {currentUserProfile.isLoggedIn ? userProfileButton() : null}
            {listItems.map((item, index) => {
              if (item.authenticate)
                return (
                  <div key={item.title + index}>
                    {listItem(
                      item.title,
                      item.subtitle,
                      item.icon,
                      item.to,
                      item.onClick,
                      item.endIcon
                    )}
                  </div>
                );
              else return null;
            })}
          </Stack>
        </List>
        <Box
          sx={{
            // // Footer just above the foot appbar
            marginTop: "auto",
            // position: "absolute",
            // bottom: "0",
            // // margin: "-90px 0px -90px 0px",
            // width: "95%",
          }}
        >
          {/* follow us section */}
          <Typography variant="S22W500C050505">{`${pageDictionry.followUs}`}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <div
                style={{
                  cursor: "pointer",
                }}
              >
                <a
                  href={"https://www.facebook.com/URrevs/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                </a>
              </div>
              <div
                style={{
                  padding: "0px 5px",
                  cursor: "pointer",
                }}
              >
                <a
                  href={"https://www.linkedin.com/company/urrevs/about/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn />
                </a>
              </div>
            </Box>
            <div
              style={{
                padding: "0px 5px",
                cursor: "pointer",
              }}
            >
              <a
                href={
                  "https://play.google.com/store/apps/details?id=com.urrevs.urrevsmobile"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <GoogleBadge />
              </a>
            </div>
          </Box>
          {/* footer */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link
              to={`../../${ROUTES_NAMES.TERMS_AND_CONDITIONS}/${language}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                dispatch(menuActions.hideMenu());
              }}
            >
              <Typography underline="always">
                {pageDictionry.termsAndAgreements}
              </Typography>
            </Link>
            <Typography sx={{ padding: "0px 3px" }} variant="S16W400C050505">
              |
            </Typography>
            <Link
              to={`../../${ROUTES_NAMES.PRIVACY_POLICY}/${language}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                dispatch(menuActions.hideMenu());
              }}
            >
              <Typography underline="always">
                {pageDictionry.privacyPolicy}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
