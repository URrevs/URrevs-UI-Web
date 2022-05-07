import { useTheme } from "@emotion/react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ListItemNavigator({
  title,
  subTitle,
  icon,
  to,
  onClick,
}) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <ListItem
      onClick={
        onClick
          ? onClick
          : () => {
              navigate(to);
            }
      }
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
          primaryTypographyProps={{
            ...theme.typography.S20W700C050505,
            lineHeight: 1,
          }}
          primary={title}
          secondaryTypographyProps={{ ...theme.typography.S16W400C65676B }}
          secondary={subTitle}
        />
      </ListItemButton>
    </ListItem>
  );
}
