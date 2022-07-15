import CompareIcon from "@mui/icons-material/Compare";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES_NAMES from "../../../RoutesNames";
import { useIndicateUserComparingMutation } from "../../../services/phones";
import { useSearchPhonesOnlyMutation } from "../../../services/search";
import { compareActions } from "../../../store/compareSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import OrangeGradientButton from "../../Buttons/OrangeGradientButton";
import SearchComponent from "../../SearchComponent";

export const CompareItem = ({ item }) => {
  const currentUser = useAppSelector((state) => state.auth);

  const [compareItem, setCompareItem] = React.useState({
    id: "",
    label: "",
    type: "",
  });
  const textContainer = useSelector((state) => {
    return state.language.textContainer;
  });
  const dispatch = useAppDispatch();
  //

  const navigate = useNavigate();

  const [searchFn] = useSearchPhonesOnlyMutation();
  const [indicateComparison] = useIndicateUserComparingMutation();
  const [error, setError] = React.useState(false);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="S18W500C050505">{`${textContainer.compare} ${item.name} ${textContainer.withWord}`}</Typography>
        {/* PLACEHOLDER FOR ACTUAL SEARCHBAR  */}
        <SearchComponent
          onResult={setCompareItem}
          item={item}
          label={textContainer.writeProductName}
          searchFn={searchFn}
          setError={setError}
          error={error} //Checks if a phone was locked in search component
        />

        <OrangeGradientButton
          color="red"
          sx={{
            marginTop: "94px",
            width: "100%",
          }}
          onClick={async () => {
            // TODO:
            //Error handling
            /* 
            1- Input is empty
            2- 
             */
            if (!(compareItem.id === "")) {
              dispatch(
                compareActions.compare({
                  productId: item._id,
                  compareId: compareItem.id,
                })
              );
              try {
                if (currentUser.isLoggedIn) {
                  indicateComparison({ pid1: item._id, pid2: compareItem.id });
                }
              } catch (e) {}

              navigate(
                `../../../${ROUTES_NAMES.COMPARISON}?cid=${compareItem.id}&pid=${item._id}`
              );
            } else setError(true);
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
      </Box>
    </React.Fragment>
  );
};
