import { useTheme } from "@emotion/react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { Fragment } from "react";
import { isDarkActions } from "../../../store/darkModeSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { languageActions } from "../../../store/languageSlice";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../../store/uiSlice";

const circleWidth = 35;
const circleHeight = 35;

const CircleBtn = styled(
  IconButton,
  {}
)(({ theme }) => ({
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: theme.palette.appBar.appBarIconBackgroundColor,
  },
  backgroundColor: theme.palette.appBar.appBarIconBackgroundColor,
  color: theme.palette.appBar.appBarIcon,
  margin: "0px 5px",
  width: circleWidth,
  height: circleHeight,
}));

export const AppBarActions = ({
  showSearch = false,
  showLanguage = false,
  showDark = false,
  showProfile = false,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const language = useAppSelector((state) => state.language.language);
  const isDark = useAppSelector((state) => state.darkMode.isDark);

  const theme = useTheme();

  const photo = useAppSelector((state) => state.auth.photo);
  const name = useAppSelector((state) => state.auth.name);

  const user = useAppSelector((state) => state.auth);
  const isLoggedIn = user.isLoggedIn;

  const navigateToProfilePage = () => {
    navigate(`/user-profile?uid=${user.uid}`);
  };
  const handleRegestrationOpen = () => {
    dispatch(uiActions.toggleRegistration());
  };

  return (
    <Fragment>
      {/* // search icon */}
      {showSearch && (
        <CircleBtn>
          <SearchIcon />
        </CircleBtn>
      )}
      {/* // user account */}
      {showProfile && (
        <CircleBtn
          onClick={!isLoggedIn ? handleRegestrationOpen : navigateToProfilePage}
        >
          {!isLoggedIn ? (
            <AccountCircle />
          ) : (
            <Avatar
              sx={{ width: circleWidth, height: circleHeight }}
              src={photo}
            />
          )}
        </CircleBtn>
      )}
      {/* // language */}
      {showLanguage && (
        <CircleBtn
          onClick={() => {
            dispatch(
              languageActions.switchLanguage({
                language: language === "en" ? "ar" : "en",
              })
            );
          }}
        >
          {language !== "en" ? "En" : "ع"}
        </CircleBtn>
      )}
      {/* // darkMode */}
      {showDark && (
        <CircleBtn
          onClick={() => {
            dispatch(isDarkActions.switchMode());
          }}
        >
          {isDark ? <DarkModeIcon /> : <LightModeIcon />}
        </CircleBtn>
      )}
    </Fragment>
  );
};
