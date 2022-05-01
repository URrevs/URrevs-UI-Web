import { useTheme } from "@emotion/react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import { Card, ListItem, ListItemAvatar } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useAppSelector } from "../../store/hooks";

export default function ProductList({ list, title }) {
  const [open, setOpen] = React.useState(true);

  list = [
    {
      brand: "Xiaomi",
      product: "",
      type: "smart_phone",
    },
    {
      brand: "Xiaomi",
      product: "",
      type: "smart_phone",
    },
    {
      brand: "Xiaomi",
      product: "",
      type: "smart_phone",
    },
    {
      brand: "Xiaomi",
      product: "",
      type: "smart_phone",
    },
    {
      brand: "Xiaomi",
      product: "",
      type: "smart_phone",
    },
    {
      brand: "Xiaomi",
      product: "",
      type: "smart_phone",
    },
  ];
  // list = new Array(5);
  console.log(list);
  const handleClick = () => {
    setOpen(!open);
  };
  const theme = useTheme();
  const textContainer = useAppSelector((state) => state.language.textContainer);

  return (
    <Card
      sx={{
        padding: 0,
        borderRadius: "15px",
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
            {list.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ padding: 0 }}>
                  <SmartphoneRoundedIcon
                    sx={{
                      marginRight: "17px",
                      fontSize: "40px",
                      color: theme.palette.productList.mobileColor,
                    }}
                  />
                  <ListItemText
                    primaryTypographyProps={{
                      ...theme.typography.S20W700C050505,
                      lineHeight: 1,
                    }}
                    primary="Nokia 606"
                    secondaryTypographyProps={{
                      ...theme.typography.S18W400C65676B,
                    }}
                    secondary={textContainer.smartphone}
                  />
                </ListItem>
                <Divider></Divider>
              </React.Fragment>
            ))}
          </List>
        </Collapse>
      </List>
    </Card>
  );
}
