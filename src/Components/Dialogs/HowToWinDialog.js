import { Link, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { DialogTemplate } from "./DialogTemplate";

export const HowToWinDialog = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  return (
    <React.Fragment>
      <DialogTemplate title={textContainer.howToWinPromptTitle}>
        <Typography
          variant="S16W500C050505"
          sx={{
            whiteSpace: "pre-line",
          }}
        >
          {textContainer.howToWinPrompt}
        </Typography>
        <Link
          href="https://stackoverflow.com/questions/57914368/how-can-i-remove-the-underline-of-textfield-from-material-ui"
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
