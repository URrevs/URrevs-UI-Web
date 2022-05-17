import { useTheme } from "@emotion/react";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import Divider from "@mui/material/Divider";
import * as React from "react";
import { useAppSelector } from "../../store/hooks";
import ListItemNavigator from "../Shared/ListItemNavigator";
import { GenericList } from "./GenericList";

export default function ProductList({ list = [] }) {
  const theme = useTheme();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  return (
    <GenericList
      title={textContainer.listOfNewlyAddedProducts + ` (${list.length})`}
    >
      {list.map((item, index) => (
        <React.Fragment key={index}>
          <ListItemNavigator
            title={item.name}
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
            to={`/phone?pid=${item._id}`}
          />

          <Divider></Divider>
        </React.Fragment>
      ))}
    </GenericList>
  );
}
