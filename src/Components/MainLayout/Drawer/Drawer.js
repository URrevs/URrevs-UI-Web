import { useTheme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import StarsIcon from "@mui/icons-material/Stars";
import { Typography } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFitText from "use-fit-text";
import ROUTES_NAMES from "../../../RoutesNames";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { menuActions } from "../../../store/uiMenuSlice";
import { postingModalActions } from "../../../store/uiPostingModalSlice";
import { ConditionalLink } from "../../ConditionalLink";
import { MenuSideBar } from "./Sidebar/MenuSideBar";

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
  borderColor: theme.palette.drawer.drawerColor,
  overflow: "none",
  textOverflow: "ellipsis",
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
  backgroundColor: "#FFF",
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
  const menuShow = useAppSelector((state) => state.menu.show);
  const showPosting = useAppSelector((state) => state.postingModal.show);
  const dispatch = useAppDispatch();
  const drawerRef = React.useRef("10px");
  const language = useAppSelector((state) => state.language.language);
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const location = useLocation();
  // <page_path> : <number>
  const map = {
    [ROUTES_NAMES.HOME]: 0,
    [ROUTES_NAMES.ALL_PRODUCTS]: 1,
    [ROUTES_NAMES.LEADERBOARD]: 2,
  };
  // change current page onClick
  const [currentPage, setValue] = React.useState(
    map[location.pathname.substring(1, location.pathname.length)]
  );
  // Change Icon Color based on pathname
  const iconColor = (val) =>
    currentPage === val && !menuShow && !showPosting
      ? focusedColor
      : unFocusedColor;
  const theme = useTheme();
  // const backgroundColor = theme.palette.bottomNavigationBar.backgroundColor;
  const focusedColor = theme.palette.bottomNavigationBar.selectedTap;
  const unFocusedColor = theme.palette.drawer.drawerIcon;
  const focusedIconSize = 39; //45
  const unfocusedIconSize = 39; //39
  const navigate = useNavigate();
  const open = props.open;

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
      to: `../${ROUTES_NAMES.HOME}`,
      itemValue: 0,
      onClick: () => {
        setValue(0);
      },
    },

    //Addreview
    {
      icon: (
        <AddIcon
          sx={{
            fontSize: showPosting ? focusedIconSize : unfocusedIconSize,
          }}
          htmlColor={showPosting && !menuShow ? focusedColor : unFocusedColor}
        />
      ),
      title: textContainer.AddNavBarItem,
      itemValue: 4,
      onClick: () => {
        dispatch(
          postingModalActions.showPostingModal({
            tab: 0,
          })
        );
      },
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
      to: ROUTES_NAMES.ALL_PRODUCTS,

      onClick: () => {
        setValue(1);
      },
      path: ROUTES_NAMES.ALL_PRODUCTS,
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
      to: ROUTES_NAMES.LEADERBOARD,
      onClick: () => {
        setValue(2);
      },
    },
    //Menu
    {
      title: textContainer.menuNavBarItem,
      itemValue: 3,
      icon: (
        <MenuIcon
          sx={{
            fontSize: menuShow ? focusedIconSize : unfocusedIconSize,
          }}
          htmlColor={menuShow ? focusedColor : unFocusedColor}
        />
      ),
      onClick: () => {
        if (!menuShow) dispatch(menuActions.showMenu());
        else dispatch(menuActions.hideMenu());
      },
    },
  ];

  const handleDrawerClose = () => {
    props.setOpen(false);
  };
  const handleClickAway = () => {
    //Works for some reason
    setTimeout(() => {
      if (menuShow) dispatch(menuActions.hideMenu());
    }, 200);
  };

  const { fontSize, ref } = useFitText({
    maxFontSize: 90,
  });

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
          <MenuSideBar open={menuShow} drawerRef={drawerRef} />
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
            <ConditionalLink condition={item.to ? item.to : false} to={item.to}>
              <ListItem
                style={{
                  padding: 0,
                  justifyContent: "center",
                  minHeight: "85px",
                }}
                onClick={item.onClick}
                button
                key={item.title}
              >
                <div style={{ textAlign: "center", padding: "8px 0" }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    {item.icon}
                  </ListItemIcon>

                  {currentPage === item.itemValue &&
                  !menuShow &&
                  !showPosting ? (
                    <div
                      ref={ref}
                      // variant="S14W700C2196f3"
                      style={{
                        ...theme.typography.S14W700C2196f3,
                        fontSize: fontSize,
                        width: "70px",
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </div>
                  ) : item.itemValue === 3 && menuShow ? (
                    <Typography
                      // variant="S14W700C2196f3"
                      sx={{
                        textAlign: "center",
                        ...theme.typography.S14W700C2196f3,
                      }}
                    >
                      {item.title}
                    </Typography>
                  ) : (
                    item.itemValue === 4 &&
                    showPosting &&
                    !menuShow && (
                      <Typography
                        // variant="S14W700C2196f3"
                        sx={{
                          textAlign: "center",
                          ...theme.typography.S14W700C2196f3,
                        }}
                      >
                        {item.title}
                      </Typography>
                    )
                  )}
                </div>
              </ListItem>
            </ConditionalLink>
          ))}
        </List>
      </PerDrawer>
    </React.Fragment>
  );
};
