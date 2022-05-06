import React from "react";
import { useSelector } from "react-redux";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import ListItemNavigator from "../Components/Shared/ListItemNavigator";
import ROUTES_NAMES from "../RoutesNames";

export const AdminPanel = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  //   CLEAN CODE
  const pageDictionry = {
    adminPanel: textContainer.adminPanel,
    updateProductsList: textContainer.updateProductsList,
    addingCompetition: textContainer.addingCompetition,
  };
  const listItems = [
    {
      title: pageDictionry.updateProductsList,
      icon: <UpdateOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: "اخر تحديث تم في 20 فبراير 2022",
      to: ROUTES_NAMES.UPDATE,
    },
    {
      title: pageDictionry.addingCompetition,
      icon: <UpdateOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: "اخر مسابقى تمت في 20 أغسطس 2019",
      to: "",
    },
  ];
  return (
    <CustomAppBar showBackBtn showLabel label={pageDictionry.adminPanel}>
      {listItems.map((item, index) => {
        return (
          <ListItemNavigator
            title={item.title}
            subTitle={item.subtitle}
            icon={item.icon}
            to={item.to}
          />
        );
      })}
    </CustomAppBar>
  );
};
