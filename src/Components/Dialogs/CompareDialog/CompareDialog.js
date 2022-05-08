import CompareIcon from "@mui/icons-material/Compare";
import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import OrangeGradientButton from "../../Buttons/OrangeGradientButton";
import { DialogTemplate } from "../DialogTemplate";
import SearchComponent from "../../SearchComponent";

export const CompareDialog = ({ item, handleClose, phones }) => {
  const textContainer = useSelector((state) => {
    return state.language.textContainer;
  });
  return (
    <Fragment>
      <DialogTemplate handleClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "94px",
          }}
        >
          <Typography variant="S18W500C050505">{`${textContainer.compare} ${item} ${textContainer.withWord}`}</Typography>
          {/* PLACEHOLDER FOR ACTUAL SEARCHBAR  */}
          <SearchComponent label={textContainer.writeProductName} />
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
