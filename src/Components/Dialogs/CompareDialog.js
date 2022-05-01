import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import CompareIcon from "@mui/icons-material/Compare";
import { useSelector } from "react-redux";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";
import { SearchBar } from "../MainLayout/Search/SearchBar";
import { MobileSearchBar } from "../MobileSearchBar";
import { DialogTemplate } from "./DialogTemplate";

export const CompareDialog = ({ item }) => {
  const [searchBarFocused, setSearchBarFocused] = React.useState(false);

  const onSearchBarFocus = () => {
    setSearchBarFocused(true);
  };

  const onSearchBarBlur = () => {
    setSearchBarFocused(false);
  };
  const textContainer = useSelector((state) => {
    return state.language.textContainer;
  });
  return (
    <Fragment>
      <DialogTemplate>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="S18W500C050505">{`قارن ${item} مع`}</Typography>
          {/* PLACEHOLDER FOR ACTUAL SEARCHBAR  */}
          <MobileSearchBar />
        </Box>
        <OrangeGradientButton color="red">
          <CompareIcon />
          <Typography
            sx={{
              margin: "0px 13px",
            }}
            variant="S18W700Cffffff"
          >
            قارن
          </Typography>
        </OrangeGradientButton>
      </DialogTemplate>
    </Fragment>
  );
};
