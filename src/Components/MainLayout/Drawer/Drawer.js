import { useTheme } from "@emotion/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import StarsIcon from "@mui/icons-material/Stars";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import RateReviewTwoToneIcon from "@mui/icons-material/RateReviewTwoTone";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Box, Paper, Slide, Typography, useMediaQuery } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import Menu from "../../../pages/20_Menu";
import { MenuSideBar } from "./Sidebar/MenuSideBar";
import ROUTES_NAMES from "../../../RoutesNames";

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
  zIndex: theme.drawer.zIndex,
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
  const [menu, setMenu] = React.useState(false);
  const drawerRef = React.useRef("10px");
  const language = useAppSelector((state) => state.language.language);
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const location = useLocation();
  // <page_path> : <number>
  const map = {
    [ROUTES_NAMES.HOME]: 0,
    [ROUTES_NAMES.PRODUCTS]: 1,
    [ROUTES_NAMES.LEADERBOARD]: 2,
  };
  // change current page onClick
  const [currentPage, setValue] = React.useState(
    map[location.pathname.substring(1, location.pathname.length)]
  );
  // Change Icon Color based on pathname
  const iconColor = (val) =>
    currentPage === val && !menu ? focusedColor : unFocusedColor;
  const theme = useTheme();
  // const backgroundColor = theme.palette.bottomNavigationBar.backgroundColor;
  const focusedColor = theme.palette.bottomNavigationBar.selectedTap;
  const unFocusedColor = theme.palette.drawer.drawerIcon;
  const focusedIconSize = 39; //45
  const unfocusedIconSize = 39; //39

  const open = props.open;

  // const isMobile = useMediaQuery("(max-width:700px)");

  const drawerTiles = [
    //Home
    {
      icon: (
        <HomeIcon
          sx={{
            // color: theme.palette.drawer.drawerIcon,

            fontSize: currentPage === 0 ? focusedIconSize : unfocusedIconSize,
          }}
          htmlColor={iconColor(0)}
        />
      ),
      title: textContainer.homeNavBarItem,
      itemValue: 0,
      onClick: () => {
        setValue(0);
      },
      path: ROUTES_NAMES.HOME,
    },

    //Addreview
    {
      icon: (
        <AddIcon
          sx={{
            fontSize: currentPage === 5 ? focusedIconSize : unfocusedIconSize,
          }}
          htmlColor={unFocusedColor}
        />
      ),
      title: textContainer.AddNavBarItem,
      itemValue: 4,
      onClick: () => {
        setValue(5);
      },
      path: ROUTES_NAMES.ADD_REVIEW,
    },

    //ProductList
    {
      icon: (
        <CategoryOutlinedIcon
          sx={{
            fontSize: currentPage === 1 ? focusedIconSize : unfocusedIconSize,
          }}
          htmlColor={iconColor(1)}
        />
      ),
      title: textContainer.categoryNavBarItem,
      itemValue: 1,
      onClick: () => {
        setValue(1);
      },
      path: ROUTES_NAMES.PRODUCTS,
    },

    //Leaderboard
    {
      icon: (
        <StarsIcon
          sx={{
            fontSize: currentPage === 2 ? focusedIconSize : unfocusedIconSize,
          }}
          htmlColor={iconColor(2)}
        />
      ),
      title: textContainer.leaderboardNavBarItem,
      itemValue: 2,
      onClick: () => {
        setValue(2);
      },
      path: ROUTES_NAMES.LEADERBOARD,
    },
    //Menu
    {
      title: "قائمة",
      itemValue: 3,
      icon: (
        <MenuIcon
          sx={{
            fontSize: menu ? focusedIconSize : unfocusedIconSize,
          }}
          htmlColor={menu ? focusedColor : unFocusedColor}
        />
      ),
      onClick: () => {
        setMenu(!menu);
      },
      path: "",
    },
  ];

  const handleDrawerClose = () => {
    props.setOpen(false);
  };
  const handleClickAway = () => {
    //Works for some reason
    setTimeout(() => {
      if (menu) setMenu(false);
    }, 200);
  };
  return (
    <React.Fragment>
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MenuSideBar open={menu} drawerRef={drawerRef} />
        </div>
      </ClickAwayListener>
      <PerDrawer
        ref={drawerRef}
        variant="permanent"
        open={open}
        onClose={handleDrawerClose}
      >
        {/* <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {language !== "ar" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader> */}
        <Divider />
        <div style={{ ...theme.mixins.toolbar }}></div>
        <List>
          {drawerTiles.map((item, i) => (
            <NavLink
              style={{
                textDecoration: "none",
                color: `${theme.palette.drawer.tileText}`,
              }}
              end
              to={item.path}
              key={item.path + item.title}
            >
              <ListItem
                style={{ padding: 0, justifyContent: "center" }}
                onClick={item.onClick}
                button
                key={item.title}
              >
                <div style={{ textAlign: "center", padding: "8px 0" }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    {item.icon}
                  </ListItemIcon>

                  {currentPage === item.itemValue && !menu ? (
                    <Typography
                      // variant="S14W700C2196f3"
                      sx={{
                        textAlign: "center",
                        ...theme.typography.S14W700C2196f3,
                      }}
                    >
                      {item.title}
                    </Typography>
                  ) : null}
                </div>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </PerDrawer>
    </React.Fragment>
  );
};
