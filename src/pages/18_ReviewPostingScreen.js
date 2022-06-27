import React from "react";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { Tabbar } from "../Components/Tabbar/Tabbar";
import { useAppSelector } from "../store/hooks";
import PostingScreen from "./PostingScreen/PostingScreen";

const ReviewPostingScreen = () => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const [value, setValue] = React.useState(0);
  const arrayOfTabs = [
    textContainer.tabBarReview,
    textContainer.tabBarQuestion,
  ];
  return (
    <CustomAppBar showLogo showSearch showProfile>
      <Tabbar arrayOfTabs={arrayOfTabs} setValue={setValue} value={value}>
        <PostingScreen value={value}></PostingScreen>
      </Tabbar>
    </CustomAppBar>
  );
};
export default ReviewPostingScreen;
