import { useMediaQuery } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import * as React from "react";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  boxShadow: "0px -2px 6px 0px #000",
  background: theme.palette.appBar.appBarColor,
  zIndex: theme.isMobile ? theme.zIndex.drawer : theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    boxShadow: 0,
    background: theme.palette.appBar.appBarColor,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const MyAppBar = (props) => {
  const open = props.open;
  const isMobile = useMediaQuery("(max-width:700px)");

  return (
    <AppBar
      position="fixed"
      elevation={0}
      open={open}
      style={{
        height: props.appBarHeight,
        width: isMobile
          ? "100%"
          : open
          ? `calc(100% - ${props.drawerWidth}px)`
          : "100%",
      }}
    >
      {props.children}
    </AppBar>
  );
};
