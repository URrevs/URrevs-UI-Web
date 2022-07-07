import { useTheme } from "@emotion/react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import ROUTES_NAMES from "../../../RoutesNames";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { languageActions } from "../../../store/languageSlice";
import { regDialogActions } from "../../../store/uiRegisterDialogSlice";
import { SearchSuggestion } from "./SearchSuggestion";

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
    navigate();
  };
  const navigateToSearchPage = () => {
    navigate(`/${ROUTES_NAMES.SEARCH}`);
  };
  const handleRegestrationOpen = () => {
    dispatch(regDialogActions.toggleRegistration());
  };

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* search icon */}
        {theme.isMobile
          ? showSearch && (
              <CircleBtn onClick={navigateToSearchPage}>
                <SearchIcon />
              </CircleBtn>
            )
          : showSearch && (
              <Fragment>
                <Box sx={{ width: "100%" }}>
                  <SearchSuggestion />
                </Box>
              </Fragment>
            )}
        {/* user account */}
        {showProfile && (
          <Link to={`/${ROUTES_NAMES.USER_PROFILE}?userId=${user.uid}`}>
            <CircleBtn>
              {!isLoggedIn ? (
                <AccountCircle />
              ) : (
                <Avatar
                  sx={{ width: circleWidth, height: circleHeight }}
                  src={photo}
                />
              )}
            </CircleBtn>
          </Link>
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
        {/* TODO: add the condition */}
        {/* // darkMode */}
        {/* <CircleBtn
          onClick={() => {
            dispatch(isDarkActions.changeMode(isDark ? "light" : "dark"));
          }}
        >
          {isDark ? <DarkModeIcon /> : <LightModeIcon />}
        </CircleBtn> */}
      </Box>
      {/* {theme.isMobile ? null : <SearchSuggestion />} */}
    </Fragment>
  );
};
