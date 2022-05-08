import * as React from "react";
import { makeStyles } from "@mui/styles";

export function GlobalStyles() {
  React.useEffect(() => {
    document.body.setAttribute("dir", "rtl");
  }, []);

  useStyles();
  return null;
}

const useStyles = makeStyles(
  {
    "@global": {
      html: {},
    },
  },
  { name: "GlobalStyles" }
);
