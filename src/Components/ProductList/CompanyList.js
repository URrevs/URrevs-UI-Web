import { useTheme } from "@emotion/react";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import Divider from "@mui/material/Divider";
import * as React from "react";
import { useAppSelector } from "../../store/hooks";
import ListItemNavigator from "../Shared/ListItemNavigator";
import { GenericList } from "./GenericList";

export default function CompanyList({ list = [] }) {
  const theme = useTheme();
  const textContainer = useAppSelector((state) => state.language.textContainer);

  return (
    <GenericList
      title={textContainer.listOfNewlyAddedCompanies + ` (${list.length})`}
    >
      {list.map((item, index) => (
        <React.Fragment key={index}>
          <ListItemNavigator
            title={item}
            subTitle={textContainer.company}
            icon={
              <BusinessOutlinedIcon
                sx={{
                  marginRight: "17px",
                  fontSize: "40px",
                  color: theme.palette.productList.mobileColor,
                }}
              />
            }
            to={`/companycpid=${item._id}`}
          />
          {/* <ListItem sx={{ padding: 0 }}>
            <BusinessOutlinedIcon
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
          </ListItem> */}
          <Divider></Divider>
        </React.Fragment>
      ))}
    </GenericList>
  );
}
