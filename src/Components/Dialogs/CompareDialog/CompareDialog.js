import CompareIcon from "@mui/icons-material/Compare";
import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import OrangeGradientButton from "../../Buttons/OrangeGradientButton";
import { DialogTemplate } from "../DialogTemplate";
import SearchComponent from "../../SearchComponent";
import { useAppDispatch } from "../../../store/hooks";
import { compareActions } from "../../../store/compareSlice";
import { useNavigate } from "react-router-dom";
import ROUTES_NAMES from "../../../RoutesNames";

export const CompareDialog = ({ item, handleClose }) => {
  const [compareItem, setCompareItem] = React.useState(0);

  const textContainer = useSelector((state) => {
    return state.language.textContainer;
  });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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
          <Typography variant="S18W500C050505">{`${textContainer.compare} ${item.name} ${textContainer.withWord}`}</Typography>
          {/* PLACEHOLDER FOR ACTUAL SEARCHBAR  */}
          <SearchComponent
            setCompareItem={setCompareItem}
            label={textContainer.writeProductName}
          />
        </Box>
        <OrangeGradientButton
          color="red"
          onClick={() => {
            if (compareItem !== 0) {
              dispatch(
                compareActions.compare({
                  productId: item._id,
                  compareId: compareItem,
                })
              );
              navigate(ROUTES_NAMES.COMPARISON);
            }
          }}
        >
          <CompareIcon />
          <Typography
            sx={{
              margin: "0px 13px",
            }}
            variant="S18W700Cffffff"
          >
            {textContainer.compare}
          </Typography>
        </OrangeGradientButton>
      </DialogTemplate>
    </Fragment>
  );
};
