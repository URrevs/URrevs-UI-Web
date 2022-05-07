import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import ListItemNavigator from "../Components/Shared/ListItemNavigator";
import ROUTES_NAMES from "../RoutesNames";
import { useGetLastUpdateInfoQuery } from "../services/update";
import { convertDateToString } from "../functions/convertDateToString";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";

export const AdminPanel = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const language = useSelector((state) => state.language.language);
  const { data, error, isLoading } = useGetLastUpdateInfoQuery();

  // CLEAN CODE
  const pageDictionry = {
    adminPanel: textContainer.adminPanel,
    updateProductsList: textContainer.updateProductsList,
    addingCompetition: textContainer.addingCompetition,
  };
  const listItems = [
    {
      title: pageDictionry.updateProductsList,
      icon: <UpdateOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: "اخر تحديث تم في",
      to: ROUTES_NAMES.UPDATE,
    },
    {
      title: pageDictionry.addingCompetition,
      icon: <UpdateOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: "اخر مسابقى تمت في",
      to: "",
    },
  ];
  return (
    <CustomAppBar showBackBtn showLabel label={pageDictionry.adminPanel}>
      {error ? (
        <div>{error.data.status}</div>
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        listItems.map((item, index) => {
          return (
            <ListItemNavigator
              title={item.title}
              subTitle={
                item.subtitle + " " + convertDateToString(data.date, language)
              }
              icon={item.icon}
              to={item.to}
            />
          );
        })
      )}
    </CustomAppBar>
  );
};
