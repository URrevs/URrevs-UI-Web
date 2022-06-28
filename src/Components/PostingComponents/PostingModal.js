import { useTheme } from "@emotion/react";
import { Modal, Stack } from "@mui/material";
import React from "react";
import ReviewPostingScreen from "../../pages/18_ReviewPostingScreen";
import PostingScreen from "../../pages/PostingScreen/PostingScreen";
import { useAppSelector } from "../../store/hooks";
import { DialogTemplate } from "../Dialogs/DialogTemplate";
import { Tabbar } from "../Tabbar/Tabbar";

//This should go into Layout
export const PostingModal = ({ open, handleClose }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  /* uiPostingModalSlice */
  const show = useAppSelector((state) => state.postingModal.show);
  const tab = useAppSelector((state) => state.postingModal.tab);
  const id = useAppSelector((state) => state.postingModal.id);
  const name = useAppSelector((state) => state.postingModal.name);
  const type = useAppSelector((state) => state.postingModal.type);

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const arrayOfTabs = [
    textContainer.tabBarReview,
    textContainer.tabBarQuestion,
  ];
  return (
    <Modal open={open} onClose={handleClose} dir={theme.direction}>
      <Stack spacing={1}>
        <DialogTemplate title={textContainer.addPost}>
          <div></div>
          <Tabbar arrayOfTabs={arrayOfTabs} setValue={setValue} value={value}>
            <PostingScreen setValue={setValue} value={value} />
          </Tabbar>
        </DialogTemplate>
      </Stack>
    </Modal>
  );
};
