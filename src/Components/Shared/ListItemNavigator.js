import { useTheme } from "@emotion/react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ListItemNavigator({ title, subTitle, icon, to }) {
  const theme = useTheme();
  return (
    <Link
      to={to}
      style={{
        background: "none",
        textDecoration: "none",
        "&:hover": {
          backgroundColor: theme.palette.hover,
          color: "black",
        },
        "&:active": {
          backgroundColor: theme.palette.hover,
        },
        "&:focus": {
          backgroundColor: theme.palette.hover,
        },
      }}
    >
      <ListItem
        disablePadding
        dense
        key={title}
        style={{
          "&:hover": {
            backgroundColor: theme.palette.hover,
          },
          "&:active": {
            backgroundColor: theme.palette.hover,
          },
          "&:focus": {
            backgroundColor: theme.palette.hover,
          },
        }}
      >
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ ...theme.typography.S20W700C050505 }}
            primary={title}
            secondaryTypographyProps={{ ...theme.typography.S16W400C65676B }}
            secondary={subTitle}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}
