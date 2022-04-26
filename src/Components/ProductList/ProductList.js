import { useTheme } from "@emotion/react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { Card, ListItem, ListItemAvatar } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

export default function ProductList({ list, title }) {
  const [open, setOpen] = React.useState(true);

  list = [
    {
      brand: "Xiaomi",
      product: "",
      type: "هاتف ذكي",
    },
    {
      brand: "Xiaomi",
      product: "",
      type: "هاتف ذكي",
    },
    {
      brand: "Xiaomi",
      product: "",
      type: "هاتف ذكي",
    },
    {
      brand: "Xiaomi",
      product: "",
      type: "هاتف ذكي",
    },
    {
      brand: "Xiaomi",
      product: "",
      type: "هاتف ذكي",
    },
    {
      brand: "Xiaomi",
      product: "",
      type: "هاتف ذكي",
    },
  ];
  // list = new Array(5);
  console.log(list);
  const handleClick = () => {
    setOpen(!open);
  };
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: "15px",
        // backgroundColor: "#000",
      }}
    >
      <List
        //   sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText
            primaryTypographyProps={{ ...theme.typography.S20W500C050505 }}
            primary="قائمة المنتجات المضافة حديثاً (20)"
          />
          {open ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {list.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <PhoneAndroidIcon />
                  </ListItemAvatar>
                  <ListItemText
                    primaryTypographyProps={{
                      ...theme.typography.S20W700C050505,
                    }}
                    primary="Nokia 606"
                    secondaryTypographyProps={{
                      ...theme.typography.S18W400C65676B,
                    }}
                    secondary="هاتف ذكي"
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
