import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { animated, useSpring } from "react-spring";
import { MyAppBar } from "./AppBar/AppBar";
import { AppBarActions } from "./AppBar/AppBarActions";
import { MyDrawer } from "./Drawer/Drawer";

import { Link } from "react-router-dom";
import Registeration from "../../pages/1_Authentication";
import { useAppSelector } from "../../store/hooks";
import { PostingModal } from "../PostingComponents/PostingModal";
import CustomizedSnackbar from "../Snackbar";
import { CustomAppBar } from "./AppBar/CustomAppBar";
import BottomNavBar from "./BottomNavBar/BottomNavBar";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Layout(props) {
  const theme = useTheme();

  const logoWidth = 94;
  const logoHeight = 30;
  const appBarHeight = theme.isMobile ? 0 : 64;
  const drawerWidth = theme.isMobile ? 0 : theme.drawer.width;

  const dictionary = useAppSelector((state) => state.language.textContainer);

  // modal
  const openReg = useAppSelector((state) => state.regDialog.registration);

  const [open, setOpen] = React.useState(false);
  const [searchBarFocused, setSearchBarFocused] = React.useState(false);

  const onSearchBarFocus = () => {
    setSearchBarFocused(true);
  };

  const onSearchBarBlur = () => {
    setSearchBarFocused(false);
  };

  const logoAnimationStyles = useSpring({
    width: searchBarFocused ? 0 : logoWidth,
    opacity: searchBarFocused ? 0 : 1,
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const appBar = () => {
    return (
      <MyAppBar
        drawerWidth={drawerWidth}
        open={open}
        setOpen={setOpen}
        appBarHeight={appBarHeight}
      >
        <Toolbar variant="dense" sx={{ minHeight: appBarHeight }}>
          {/* logo */}
          <Link to="./">
            <animated.div
              style={{
                ...logoAnimationStyles,
                margin: "5px 12px 0px 12px",
              }}
            >
              <img
                src="./images/logo.png"
                width={logoWidth}
                height={logoHeight}
                alt="URrevs"
              />
            </animated.div>
          </Link>

          {/* <SearchBar
            searchTitle={dictionary.search}
            onSearchBarFocus={onSearchBarFocus}
            onSearchBarBlur={onSearchBarBlur}
            isSearchBarFocused={searchBarFocused}
          /> */}

          <AppBarActions showSearch={true} showProfile={true} />
        </Toolbar>
      </MyAppBar>
    );
  };

  const customAppBar = () => {
    return (
      <CustomAppBar showLabel={false} showLogo={true} showProfile showSearch />
    );
  };

  return (
    <Box sx={{}}>
      {!theme.isMobile && appBar()}
      {theme.isMobile ? <></> : <MyDrawer open={open} setOpen={setOpen} />}
      <Registeration />
      <CustomizedSnackbar />
      <PostingModal />
      {theme.isMobile ? <BottomNavBar /> : <></>}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 0,
          marginTop: `${appBarHeight}px`,
          marginLeft: drawerWidth,
          // marginBottom: theme.isMobile ? "75px" : "",
        }}
      >
        {/* <DrawerHeader /> */}
        {/* div for spacing between app bar and whole pages */}
        {/* <div style={{ marginTop: `${appBarHeight + 30}px` }}> */}
        {props.children}
        {theme.isMobile ? <div style={{ height: "75px" }}></div> : <></>}
        {/* </div> */}
      </Box>
    </Box>
  );
}
