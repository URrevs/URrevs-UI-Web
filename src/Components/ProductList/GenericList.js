import { useTheme } from "@emotion/react";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import {
  Card,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { CARD_BORDER_RADIUS } from "../../constants";

export const GenericList = ({ title, children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <Card
        sx={{
          padding: 0,
          borderRadius: `${CARD_BORDER_RADIUS}px`,
          backgroundColor: theme.palette.productList.backgroundColor,
        }}
        elevation={3}
      >
        <List
          sx={{ padding: 0 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primaryTypographyProps={{
                ...theme.typography.S20W500C050505,
                lineHeight: 1,
              }}
              primary={title}
            />
            {open ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                padding: "0px 1px 44px 3px",
              }}
            >
              {children}
            </List>
          </Collapse>
        </List>
      </Card>
    </React.Fragment>
  );
};
