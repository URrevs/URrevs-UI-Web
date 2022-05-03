import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Card, IconButton, styled, Typography } from "@mui/material";
import React from "react";

const PromptStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: "12px",
  padding: "20px 20px",
}));

export const DialogTemplate = ({ title, children }) => {
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
              paddingBottom: "16px",
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
