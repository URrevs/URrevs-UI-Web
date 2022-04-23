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

//TODO: when width is so low make height larger

const map = {
  "/products": 0,
  "/add-review": 1,
  "/": 2,
  "/about": 3,
  "/menu": 4,
};

export default function BottomNavBar() {
  const location = useLocation();
  console.log(map[location.pathname]);

  const [currentPage, setValue] = React.useState(map[location.pathname]);
  const theme = useTheme();
  const dictionary = useAppSelector(
    (state) => state.language.textContainer.bottomNavBar
  );
  const navigate = useNavigate();

  // item styles
  const iconColor = (val) => (currentPage === val ? "#2196F3" : "#050505");
  const focusedIconSize = 45; //45
  const unfocusedIconSize = 39; //39

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
      label: dictionary[0],
      itemValue: 0,
      path: "/products",
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
      label: dictionary[1],
      path: "/add-review",
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
      label: dictionary[2],
      itemValue: 2,
      path: "/",
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
      label: dictionary[3],
      itemValue: 3,
      path: "/about",
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
      label: dictionary[4],
      itemValue: 4,
      path: "/menu",
    },
  ];

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
        zIndex: 1000,
        backgroundColor: theme.palette.bottomNavigationBar,
        backgroundColor: theme.palette.bottomNavigationBar,
        borderRadius: "10px 10px 0px 0px",
        boxShadow: "0px 2px 6px 0px",
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
            minWidth: window.innerWidth / 5 - 10,
            marginBottom: item.itemValue === currentPage ? 6 : 0,

            // border:'5px solid #000'
          }}
          label={
            <Typography
              variant={
                item.itemValue === currentPage
                  ? "S14W700C2196f3"
                  : "S14W400C050505"
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
}
