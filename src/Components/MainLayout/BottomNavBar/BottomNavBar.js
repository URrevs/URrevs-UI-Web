import { useTheme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import StarsIcon from "@mui/icons-material/Stars";
import { Container, Typography } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { MdHome } from "react-icons/md";
import ROUTES_NAMES from "../../../RoutesNames";

//TODO: when width is so low make height larger

const map = {
  [ROUTES_NAMES.PRODUCTS]: 0,
  [ROUTES_NAMES.ADD_REVIEW]: 1,
  [ROUTES_NAMES.HOME]: 2,
  [ROUTES_NAMES.LEADERBOARD]: 3,
  [ROUTES_NAMES.MENU]: 4,
};

export default function BottomNavBar() {
  const location = useLocation();

  const [currentPage, setValue] = React.useState(
    map[location.pathname.substring(1, location.pathname.length)]
  );

  const theme = useTheme();
  const backgroundColor = theme.palette.bottomNavigationBar.backgroundColor;
  const focusedColor = theme.palette.bottomNavigationBar.selectedTap;
  const unFocusedColor = theme.palette.bottomNavigationBar.unselectedTap;
  const iconColor = (val) =>
    currentPage === val ? focusedColor : unFocusedColor;
  const focusedIconSize = 45; //45
  const unfocusedIconSize = 39; //39

  const dictionary = useAppSelector((state) => state.language.textContainer);
  const navigate = useNavigate();

  // item styles

  const navBarItems = [
    {
      icon: (
        <CategoryOutlinedIcon
          sx={{
            fontSize: currentPage === 0 ? focusedIconSize : unfocusedIconSize,
          }}
          htmlColor={iconColor(0)}
        />
      ),
      label: dictionary.categoryNavBarItem,
      itemValue: 0,
      path: ROUTES_NAMES.PRODUCTS,
    },
    {
      itemValue: 1,
      icon: (
        <AddIcon
          sx={{
            fontSize: currentPage === 1 ? focusedIconSize : unfocusedIconSize,
          }}
          htmlColor={iconColor(1)}
        />
      ),
      label: dictionary.AddNavBarItem,
      path: ROUTES_NAMES.ADD_REVIEW,
    },
    {
      icon: (
        <HomeIcon
          sx={{
            fontSize: currentPage === 2 ? focusedIconSize : unfocusedIconSize,
          }}
          htmlColor={iconColor(2)}
        />
      ),
      label: dictionary.homeNavBarItem,
      itemValue: 2,
      path: ROUTES_NAMES.HOME,
    },
    {
      icon: (
        <StarsIcon
          sx={{
            fontSize: currentPage === 3 ? focusedIconSize : unfocusedIconSize,
          }}
          htmlColor={iconColor(3)}
        />
      ),
      label: dictionary.leaderboardNavBarItem,
      itemValue: 3,
      path: ROUTES_NAMES.LEADERBOARD,
    },
    {
      icon: (
        <MenuIcon
          sx={{
            fontSize: currentPage === 4 ? focusedIconSize : unfocusedIconSize,
          }}
          htmlColor={iconColor(4)}
        />
      ),
      label: dictionary.menuNavBarItem,
      itemValue: 4,
      path: ROUTES_NAMES.MENU,
    },
  ];

  // this condition is to show bottom nav bar or not
  if (
    location.pathname === "/" ||
    map[location.pathname.substring(1, location.pathname.length)] !== undefined
  ) {
    return (
      <BottomNavigation
        sx={{
          height: "auto",
          display: "flex",
          flexWrap: "wrap",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 0,
          minHeight: 60,
          zIndex: 100000,
          backgroundColor: backgroundColor,
          borderRadius: "10px 10px 0px 0px",
          boxShadow: "0px 2px 6px 0px",
          marginTop: "65px",
        }}
        showLabels
        currentPage={currentPage}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(navBarItems[newValue].path);
        }}
      >
        {navBarItems.map((item) => (
          <BottomNavigationAction
            key={item.itemValue}
            style={{
              padding: 0,
              margin: 0,
              bottom: 0,
              minWidth: 40,
              marginBottom: item.itemValue === currentPage ? 6 : 0,

              // border:'5px solid #000'
            }}
            label={
              <Typography
                variant={
                  item.itemValue === currentPage
                    ? "S14W700C2196f3"
                    : "S14W400C606266"
                }
                style={{
                  lineHeight: 1,
                }}
              >
                {item.label}
              </Typography>
            }
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    );
  } else {
    return <></>;
  }
}
