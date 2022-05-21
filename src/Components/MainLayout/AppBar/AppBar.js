import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import * as React from "react";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  boxShadow: "0px -2px 6px 0px #000",
  position: "fixed",
  background: theme.palette.appBar.appBarColor,
  zIndex: theme.isMobile ? theme.zIndex.drawer : theme.zIndex.drawer + 1,
}));

export const MyAppBar = (props) => {
  const theme = useTheme();

  return (
    <AppBar
      elevation={0}
      style={{
        zIndex: theme.appBar.zIndex,
        height: props.appBarHeight,
        width: "100%",
      }}
    >
      {props.children}
    </AppBar>
  );
};
