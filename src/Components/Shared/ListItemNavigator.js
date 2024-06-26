import { useTheme } from "@emotion/react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ListItemNavigator({
  title,
  subTitle,
  icon,
  to,
  onClick,
  endIcon,
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
      key={title + subTitle + to}
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
      <ListItemButton
        sx={{
          padding: 0,
        }}
      >
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
        {endIcon}
      </ListItemButton>
    </ListItem>
  );
}
