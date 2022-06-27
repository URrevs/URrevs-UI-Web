import { Stack } from "@mui/material";
import React from "react";
import ReviewPostingScreen from "../../pages/18_ReviewPostingScreen";
import PostingScreen from "../../pages/PostingScreen/PostingScreen";
import { useAppSelector } from "../../store/hooks";
import { DialogTemplate } from "../Dialogs/DialogTemplate";
import { Tabbar } from "../Tabbar/Tabbar";

//This should go into Layout
export const PostingModal = () => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const [value, setValue] = React.useState(0);
  const arrayOfTabs = [
    textContainer.tabBarReview,
    textContainer.tabBarQuestion,
  ];
  return (
    <Stack spacing={1}>
      <DialogTemplate title={textContainer.addPost}>
        <div></div>
        <Tabbar arrayOfTabs={arrayOfTabs} setValue={setValue} value={value}>
          <PostingScreen setValue={setValue} value={value} />
        </Tabbar>
      </DialogTemplate>
    </Stack>
  );
};
