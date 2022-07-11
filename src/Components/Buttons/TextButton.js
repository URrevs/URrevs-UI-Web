import { Typography } from "@mui/material";
import React from "react";

export function TextButton({ title, onClick }) {
  return (
    <Typography
      onClick={() => onClick()}
      sx={{
        "&:hover": {
          cursor: "pointer",
          textDecoration: "underline",
        },
      }}
      variant="S14W700C050505"
    >
      {title}
    </Typography>
  );
}
