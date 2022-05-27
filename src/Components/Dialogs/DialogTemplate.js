import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Card, IconButton, styled, Typography } from "@mui/material";
import React from "react";

const PromptStyled = styled(
  Box,
  {}
)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  [theme.breakpoints.down("md")]: {
    width: "calc(100% - 32px)",
  },
  maxHeight: "75vh",
  boxShadow: 24,
  padding: 16,
  borderRadius: 15,
  overflowY: "scroll",
  background: theme.palette.modalColor,
}));

export const DialogTemplate = ({ title, children, handleClose }) => {
  return (
    <React.Fragment>
      <PromptStyled elevation={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* title and icon */}
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: title === undefined ? 0 : "16px",
              // position: "sticky",
              // top: 0,
            }}
          >
            <Typography variant="S16W700C050505">{title}</Typography>
            <IconButton
              sx={{
                border: "1px solid #050505",
                filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))",
                padding: 0,
                margin: 0,
                backgroundColor: "#E8E8E8",
              }}
              onClick={handleClose}
            >
              <CloseIcon htmlColor="#000" fontSize="medium" />
            </IconButton>
          </Box>
          {children}
        </Box>
      </PromptStyled>
    </React.Fragment>
  );
};
