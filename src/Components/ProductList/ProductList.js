import { useTheme } from "@emotion/react";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import { Card, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import * as React from "react";
import { CARD_BORDER_RADIUS } from "../../constants";
import { useAppSelector } from "../../store/hooks";
import ListItemNavigator from "../Shared/ListItemNavigator";
import { GenericList } from "./GenericList";

export default function ProductList({ list = [] }) {
  const theme = useTheme();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  return list.length === 0 ? (
    <Card
      sx={{
        padding: 2,
        borderRadius: `${CARD_BORDER_RADIUS}px`,
        backgroundColor: theme.palette.productList.backgroundColor,
        textAlign: "center",
      }}
      elevation={3}
    >
      <Typography variant="S20W500C050505">
        لم يتم العثور على منتجات جديدة
      </Typography>
    </Card>
  ) : (
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
