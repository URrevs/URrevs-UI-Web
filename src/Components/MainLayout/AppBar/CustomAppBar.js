import styled from "@emotion/styled";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import React, { Fragment } from "react";
import { AppBarActions } from "./AppBarActions";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const CustomAppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "direction",
})(({ theme, direction }) => ({
  direction: direction,
  boxShadow: "0px -2px 6px 0px #000",
  background: theme.palette.appBar.appBarColor,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const logoWidth = 94;
const logoHeight = 35;

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
}) => {
  const theme = useTheme();
  const backButtonDirection = theme.direction === "rtl" ? -1 : 1;

  const navigate = useNavigate();
  const backBtnHandler = () => {
    console.log("backButtonHandler");
    navigate(-1);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBarStyled position="static">
        <Toolbar
          sx={{
            justifyContent: "space-between",
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
    </Box>
  );
};
