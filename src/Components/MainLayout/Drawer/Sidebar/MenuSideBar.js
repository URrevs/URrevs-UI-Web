import { useTheme } from "@emotion/react";
import { Paper, Slide } from "@mui/material";
import React from "react";
import Menu from "../../../../pages/20_Menu";
import { useAppSelector } from "../../../../store/hooks";

export const MenuSideBar = ({ drawerRef }) => {
  const theme = useTheme();
  const menuOpen = useAppSelector((state) => state.menu.show);

  return (
    <div>
      <Slide
        direction={theme.direction === "rtl" ? "left" : "right"}
        in={menuOpen}
        mountOnEnter
        unmountOnExit
        style={{ maxHeight: "calc(100vh - 60px)" }}
      >
        <Paper
          sx={{
            position: "fixed",
            top: theme.sideBar.height,
            left: drawerRef.current?.clientWidth
              ? drawerRef.current.clientWidth
              : "10px",
            width: "400px",
            height: "93vh",
            zIndex: 10,
            overflow: "auto",
          }}
        >
          <Menu isDesktop={true} drawerRef={drawerRef} />
        </Paper>
      </Slide>
    </div>
  );
};
