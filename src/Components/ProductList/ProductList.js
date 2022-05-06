import { useTheme } from "@emotion/react";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import { ListItem } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useAppSelector } from "../../store/hooks";
import ListItemNavigator from "../Shared/ListItemNavigator";
import { GenericList } from "./GenericList";

export default function ProductList({ list }) {
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
  const theme = useTheme();
  const textContainer = useAppSelector((state) => state.language.textContainer);

  return (
    <GenericList
      title={textContainer.listOfNewlyAddedProducts + ` (${list.length})`}
    >
      {list.map((item, index) => (
        <React.Fragment key={index}>
          <ListItemNavigator
            title="Nokia 606"
            subTitle={textContainer.smartphone}
            icon={
              <SmartphoneRoundedIcon
                sx={{
                  marginRight: "17px",
                  fontSize: "40px",
                  color: theme.palette.productList.mobileColor,
                }}
              />
            }
            to=""
          />
          {/* <ListItem sx={{ padding: 0 }}>
           
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
          </ListItem> */}
          <Divider></Divider>
        </React.Fragment>
      ))}
    </GenericList>
  );
}
