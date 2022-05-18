import { Paper, Slide } from "@mui/material";
import React from "react";
import Menu from "../../../../pages/20_Menu";

export const MenuSideBar = ({ drawer, open }) => {
  return (
    <React.Fragment>
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            position: "fixed",
            top: "45px",
            left: drawer ? drawer : "10px",
            width: "400px",
            height: "93vh",
            zIndex: 1,
            overflow: "auto",
          }}
        >
          <Menu />
        </Paper>
      </Slide>
    </React.Fragment>
  );
};
