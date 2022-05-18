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
import { useSearchPhonesOnlyMutation } from "../../../services/search";
import { useIndicateUserComparingMutation } from "../../../services/phones";

export const CompareDialog = ({ item, handleClose }) => {
  const [compareItem, setCompareItem] = React.useState({});

  const textContainer = useSelector((state) => {
    return state.language.textContainer;
  });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [searchFn] = useSearchPhonesOnlyMutation();
  const [indicateComparison] = useIndicateUserComparingMutation();

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
            searchFn={searchFn}
          />
        </Box>
        <OrangeGradientButton
          color="red"
          onClick={async () => {
            // TODO:
            if (compareItem !== 0) {
              dispatch(
                compareActions.compare({
                  productId: item._id,
                  compareId: compareItem,
                })
              );
              console.log(compareItem);
              try {
                indicateComparison({ pid1: item._id, pid2: compareItem.pid });
              } catch (e) {
                console.log(e);
              }

              navigate(
                `${ROUTES_NAMES.COMPARISON}?cid=${compareItem.pid}&pid=${item._id}`
              );
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
