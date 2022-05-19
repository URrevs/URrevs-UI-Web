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
import {
  Avatar,
  Box,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { regDialogActions } from "../../../store/uiRegisterDialogSlice";
import ROUTES_NAMES from "../../../RoutesNames";

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
  const [searchSuggestion, setSearchSuggestion] = React.useState(false);
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const language = useAppSelector((state) => state.language.language);
  const isDark = useAppSelector((state) => state.darkMode.isDark);
  const isMobile = useMediaQuery("(max-width:700px)");

  const theme = useTheme();
  const params = {
    variant: "standard",
    sx: {
      flex: 1,
      // width: "100",
      input: {
        "&::placeholder": {
          opacity: 1,
          fontWeight: 300,
          fontSize: 16,
        },
      },
    },
    placeholder: textContainer.searchForAProductOrACompany,
    InputProps: {
      // type: "search",
      disableUnderline: true,
      startAdornment: (
        <InputAdornment position="start">
          <IconButton onClick={() => {}}>
            <SearchIcon htmlColor={theme.palette.deskTopSearchBar.searchIcon} />
          </IconButton>
        </InputAdornment>
      ),
      style: {
        width: "100%",
        height: "50px",
        ...theme.typography.S16W500C050505,
        alignContent: "center",
        color: theme.palette.textField.inputFieldText,
        background: theme.palette.textField.inputFieldBackground,
        borderRadius: 90,
        // border: `0.1px solid ${theme.palette.textField.borderColor} `,
        //
        // borderRadius: TEXT_FIELD_BORDER_RADIUS,
        // border: `${TEXT_FIELD_BORDER_THICKNESS}px solid ${theme.palette.textField.borderColor}`,
      },
    },
  };
  const photo = useAppSelector((state) => state.auth.photo);
  const name = useAppSelector((state) => state.auth.name);

  const user = useAppSelector((state) => state.auth);
  const isLoggedIn = user.isLoggedIn;

  const navigateToProfilePage = () => {
    navigate(`/${ROUTES_NAMES.USER_PROFILE}?userId=${user.uid}`);
  };
  const navigateToSearchPage = () => {
    navigate(`/${ROUTES_NAMES.SEARCH}`);
  };
  const handleRegestrationOpen = () => {
    dispatch(regDialogActions.toggleRegistration());
  };

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        {/* search icon */}
        {isMobile
          ? showSearch && (
              <CircleBtn onClick={navigateToSearchPage}>
                <SearchIcon />
              </CircleBtn>
            )
          : showSearch && (
              <TextField
                {...params}
                sx={{ padding: "0px 15px", width: "100%" }}
                onFocus={() => {
                  console.log("focus");
                  setSearchSuggestion(true);
                }}
                onBlur={() => {
                  console.log("blur");
                  setSearchSuggestion(false);
                }}
              />
            )}
        {/* user account */}
        {showProfile && (
          <CircleBtn
            onClick={
              !isLoggedIn ? handleRegestrationOpen : navigateToProfilePage
            }
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
      </Box>
    </Fragment>
  );
};
