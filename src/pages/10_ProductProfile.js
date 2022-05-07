import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { Tabbar } from "../Components/Tabbar/Tabbar";
import { SpecsTabbar } from "./ProductProfileTabs/SpecsTabbar";

export const ProductProfile = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const [value, setValue] = React.useState(0);
  const pageDictionary = {
    reviews: textContainer.tabBarReviews,
    specs: textContainer.tabBarSpecs,
    QnA: textContainer.tabBarQuestionsAndAnswers,
  };
  const tabBarArray = [
    pageDictionary.reviews,
    pageDictionary.specs,
    pageDictionary.QnA,
  ];

  return (
    <React.Fragment>
      <CustomAppBar
        showBackBtn
        englishName
        showLabel
        label="Nokia 7 Plus"
        showSearch
        showProfile
      >
        <Box
          sx={{
            padding: "0px 6px",
          }}
        >
          <Tabbar arrayOfTabs={tabBarArray} value={value} setValue={setValue} />
          {value === 1 ? <SpecsTabbar></SpecsTabbar> : null}
        </Box>
      </CustomAppBar>
    </React.Fragment>
  );
};
