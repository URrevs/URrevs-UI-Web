import { Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../store/hooks";

export const FullScreenError = () => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      <Typography variant="S18W300C050505">
        {textContainer.somethingWentWrong}
      </Typography>
    </div>
  );
};
