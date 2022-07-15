import { Link, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { DialogTemplate } from "./DialogTemplate";

export const HowToWinDialog = ({ handleClose, isCurrentlyHeld }) => {
  const textContainer = useSelector((state) => state.language.textContainer);
  return (
    <React.Fragment>
      <DialogTemplate
        handleClose={handleClose}
        title={isCurrentlyHeld ? textContainer.howToWinPromptTitle : ""}
        sx={
          {
            // paddingBottom:"16"
          }
        }
      >
        <Typography
          variant="S16W500C050505"
          sx={{
            whiteSpace: "pre-line",
          }}
        >
          {textContainer.howToWinPrompt}
        </Typography>

        <Link
          href="https://play.google.com/store/apps/details?id=com.urrevs.urrevsmobile" //Placeholder Link
          underline="always"
        >
          <Typography variant="S16W700C050505">
            {textContainer.ourMobileApp}
          </Typography>
        </Link>

        <Typography variant="S16W500C050505">
          {textContainer.howToWinPrompt2}
        </Typography>
      </DialogTemplate>
    </React.Fragment>
  );
};
