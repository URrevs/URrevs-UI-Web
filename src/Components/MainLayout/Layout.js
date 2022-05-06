import { useTheme } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { animated, useSpring } from "react-spring";
import { MyAppBar } from "./AppBar/AppBar";
import { AppBarActions } from "./AppBar/AppBarActions";
import { MyDrawer } from "./Drawer/Drawer";
import { SearchBar } from "./Search/SearchBar";

import { drawerWidth } from "./Drawer/Drawer";
import { useAppSelector } from "../../store/hooks";
import Registeration from "../../pages/1_Authentication";
import BottomNavBar from "./BottomNavBar/BottomNavBar";
import { CustomAppBar } from "./AppBar/CustomAppBar";

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
  const appBarHeight = theme.isMobile ? 45 : null;

  const dictionary = useAppSelector((state) => state.language.textContainer);

  // modal
  const openReg = useAppSelector((state) => state.ui.registration);

  const [open, setOpen] = React.useState(false);
  const [searchBarFocused, setSearchBarFocused] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:700px)");

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
          {/* drawer button */}
          {theme.isMobile ? (
            <></>
          ) : (
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                margin: 0,
                padding: 0,
                ...(open && !isMobile && { display: "none" }),
              }}
            >
              <MenuIcon htmlColor={theme.palette.drawer.drawerIcon} />
            </IconButton>
          )}
          {/* logo */}
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

          <SearchBar
            searchTitle={dictionary.search}
            onSearchBarFocus={onSearchBarFocus}
            onSearchBarBlur={onSearchBarBlur}
            isSearchBarFocused={searchBarFocused}
          />

          <AppBarActions
            showSearch={true}
            showLanguage={true}
            showDark={true}
            showProfile={true}
          />
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
      {customAppBar()}
      {appBar()}
      {/* {theme.isMobile ? <></> : <MyDrawer open={open} setOpen={setOpen} />} */}

      <Registeration />
      {theme.isMobile ? <BottomNavBar /> : <></>}
      <Box component="main" sx={{ flexGrow: 1, p: 3, padding: 0 }}>
        {/* <DrawerHeader /> */}
        {props.children}
      </Box>
    </Box>
  );
}
