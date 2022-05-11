import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { FilterTabbar } from "../../Tabbar/FilterTabbar";
import { AppBarActions } from "./AppBarActions";
import BottomTabBar from "./BottomTabBar";

const CustomAppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "direction",
})(({ theme, direction }) => ({
  direction: direction,
  minHeight: 45,
  boxShadow: "0 1px 6px 0px #0000029",
  background: theme.palette.appBar.appBarColor,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const logoWidth = 94;
const logoHeight = 30;

export const CustomAppBar = ({
  showLogo,
  showSearch,
  showLanguage,
  showDark,
  showProfile,
  showBackBtn,
  showLabel,
  label,
  englishName,
  showTabBar,
  children,
  tabBar,
}) => {
  const theme = useTheme();
  const backButtonDirection = theme.direction === "rtl" ? -1 : 1;

  const navigate = useNavigate();

  const backBtnHandler = () => {
    console.log("backButtonHandler");
    navigate(-1);
  };

  return (
    <div sx={{ flexGrow: 1 }}>
      <CustomAppBarStyled
        position="fixed"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar
          variant="dense"
          style={{
            justifyContent: "space-between",
            boxShadow: "none",
            minHeight: 45,
            padding: "0 16px",
          }}
        >
          <div style={{ display: "flex" }}>
            <Fragment>
              {showBackBtn && (
                <IconButton onClick={backBtnHandler}>
                  <KeyboardBackspaceRoundedIcon
                    htmlColor={theme.palette.appBar.backButton}
                    sx={{
                      transform: `scale(${backButtonDirection})`,
                    }}
                  />
                </IconButton>
              )}
              {showLogo && (
                <img
                  width={logoWidth}
                  height={logoHeight}
                  alt="URrevs"
                  src="./images/logo.png"
                />
              )}
            </Fragment>
            {englishName ? (
              <AppBarActions
                showSearch={showSearch}
                showLanguage={showLanguage}
                showDark={showDark}
                showProfile={showProfile}
              />
            ) : (
              showLabel && (
                <Typography variant="S20W700C050505">{label}</Typography>
              )
            )}
          </div>
          <div>
            {!englishName ? (
              <AppBarActions
                showSearch={showSearch}
                showLanguage={showLanguage}
                showDark={showDark}
                showProfile={showProfile}
              />
            ) : (
              showLabel && (
                <Typography variant="S20W700C050505">{label}</Typography>
              )
            )}
          </div>
        </Toolbar>
      </CustomAppBarStyled>
      <Box
        style={{
          marginTop: 45,
        }}
      >
        {tabBar}
        {children}
      </Box>
    </div>
  );
};
