import { useTheme } from "@emotion/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import RateReviewTwoToneIcon from "@mui/icons-material/RateReviewTwoTone";
import { Typography, useMediaQuery } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

export const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create(["width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.drawer.drawerColor,
});

const closedMixin = (theme) => ({
  backgroundColor: theme.palette.drawer.drawerColor,
  transition: theme.transitions.create(["width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const PerDrawer = styled(
  MuiDrawer,
  {}
)(({ theme, open }) => ({
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  position: "relative",
}));

export const MyDrawer = (props) => {
  const language = useSelector((state) => state.language.language);
  const textContainer = useSelector((state) => state.language.textContainer);

  const theme = useTheme();

  const open = props.open;

  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:700px)");

  const drawerTiles = [
    {
      title: textContainer.drawerTitles.homePage,
      icon: <HomeTwoToneIcon />,
      path: "/",
    },
    {
      title: textContainer.drawerTitles.reviews,
      icon: <RateReviewTwoToneIcon />,
      path: "/reviews",
    },
    {
      title: textContainer.drawerTitles.addReview,
      icon: <AddBoxTwoToneIcon />,
      path: "/add-review",
    },
    {
      title: textContainer.drawerTitles.articles,
      icon: <ForumTwoToneIcon />,
      path: "/blog",
    },
    {
      title: textContainer.drawerTitles.aboutUs,
      icon: <ErrorTwoToneIcon />,
      path: "/about",
    },
  ];

  const handleDrawerClose = () => {
    props.setOpen(false);
  };

  return (
    <PerDrawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={handleDrawerClose}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {language !== "ar" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {drawerTiles.map((item) => (
          <NavLink
            style={{
              textDecoration: "none",
              color: `${theme.palette.drawer.tileText}`,
            }}
            end
            to={item.path}
            key={item.path}
          >
            <ListItem
              style={{
                backgroundColor:
                  location.pathname === item.path
                    ? theme.palette.drawer.activePage
                    : "",
              }}
              button
              key={item.title}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                style={{ textAlign: language === "ar" ? "right" : "left" }}
              >
                <Typography>{item.title}</Typography>
              </ListItemText>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </PerDrawer>
  );
};
