import { useTheme } from "@emotion/react";
import { Modal, Stack } from "@mui/material";
import React from "react";
import ReviewPostingScreen from "../../pages/18_ReviewPostingScreen";
import PostingScreen from "../../pages/PostingScreen/PostingScreen";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { postingModalActions } from "../../store/uiPostingModalSlice";
import { DialogTemplate } from "../Dialogs/DialogTemplate";
import { Tabbar } from "../Tabbar/Tabbar";

//This should go into Layout
export const PostingModal = () => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  /* uiPostingModalSlice */

  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.postingModal.show);
  const tab = useAppSelector((state) => state.postingModal.tab);

  const id = useAppSelector((state) => state.postingModal.id);
  const name = useAppSelector((state) => state.postingModal.name);
  const type = useAppSelector((state) => state.postingModal.type);

  const handleClose = () => {
    dispatch(postingModalActions.hidePostingModal());
  };

  const theme = useTheme();

  const setTab = (tab) => {
    dispatch(
      postingModalActions.switchTab({
        tab: tab,
      })
    );
  };

  const arrayOfTabs = [
    textContainer.tabBarReview,
    textContainer.tabBarQuestion,
  ];

  return (
    <Modal open={show} onClose={handleClose} dir={theme.direction}>
      <Stack spacing={1}>
        <DialogTemplate title={textContainer.addPost}>
          <div></div>
          <Tabbar arrayOfTabs={arrayOfTabs} setValue={setTab} value={tab}>
            <PostingScreen setValue={setTab} value={tab} />
          </Tabbar>
        </DialogTemplate>
      </Stack>
    </Modal>
  );
};
