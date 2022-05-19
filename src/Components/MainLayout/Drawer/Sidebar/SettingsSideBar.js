import { useTheme } from "@emotion/react";
import { Box, IconButton, Paper, Slide, Typography } from "@mui/material";
import React from "react";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { SettingsScreen } from "../../../../pages/21_SettingsScreen";
import { useSelector } from "react-redux";

export const SettingsSideBar = ({
  settingsSlide,
  setSettingsSlide,
  drawerRef,
}) => {
  const theme = useTheme();
  const backButtonDirection = theme.direction === "rtl" ? -1 : 1;
  const textContainer = useSelector((state) => state.language.textContainer);
  return (
    <React.Fragment>
      <Slide direction="left" in={settingsSlide} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            position: "fixed",
            top: "45px",
            left: drawerRef.current?.clientWidth
              ? drawerRef.current.clientWidth
              : "10px",
            width: "400px",
            height: "93vh",
            zIndex: 1,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => {
                setSettingsSlide(!settingsSlide);
              }}
            >
              <KeyboardBackspaceRoundedIcon
                htmlColor={theme.palette.appBar.backButton}
                sx={{
                  transform: `scale(${backButtonDirection})`,
                }}
              />
            </IconButton>
            <Typography sx={{ marginLeft: "10px" }} variant="S20W700C050505">
              {"الاعدادات:"}
            </Typography>
          </Box>
          <SettingsScreen isDesktop={true} />
        </Paper>
      </Slide>
    </React.Fragment>
  );
};
