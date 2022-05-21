import { useTheme } from "@emotion/react";
import { Button, Snackbar, Typography } from "@mui/material";
import React from "react";

export const StyledSnackbar = ({
  text,
  btnText,
  handleClose,
  open,
  handleClick,
}) => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Snackbar
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#C4C4C4",
            borderRadius: "12px",
            ...theme.typography.S16W500C050505,
            lineHeight: 1,
          },
        }}
        open={open}
        autoHideDuration={6000}
        message={text}
        onClose={handleClose}
        action={
          <Button
            onClick={handleClick}
            sx={{
              textTransform: "none",
            }}
          >
            <Typography variant="S16W800C2196F3">{btnText}</Typography>
          </Button>
        }
      />
    </React.Fragment>
  );
};
