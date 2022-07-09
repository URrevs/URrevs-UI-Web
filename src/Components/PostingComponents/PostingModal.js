import { useTheme } from "@emotion/react";
import { Modal, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostingScreen from "../../pages/PostingScreen/PostingScreen";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { postingModalActions } from "../../store/uiPostingModalSlice";
import { DialogTemplate } from "../Dialogs/DialogTemplate";
import { Tabbar } from "../Tabbar/Tabbar";

//This should go into Layout
export const PostingModal = ({ linkShow = false }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const navigate = useNavigate();

  /* uiPostingModalSlice */

  const dispatch = useAppDispatch();

  const show = useAppSelector((state) => state.postingModal.show);

  const tab = useAppSelector((state) => state.postingModal.tab);

  const id = useAppSelector((state) => state.postingModal.id);
  const name = useAppSelector((state) => state.postingModal.name);
  const type = useAppSelector((state) => state.postingModal.type);

  const handleClose = () => {
    const answer = window.confirm("Are you sure you want to close this?");
    if (answer) {
      // if modal was up because of route
      if (linkShow) navigate("/");

      dispatch(postingModalActions.hidePostingModal());
    }
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
    <Modal open={show || linkShow} onClose={handleClose} dir={theme.direction}>
      <Stack spacing={1}>
        <DialogTemplate title={textContainer.addPost}>
          <div></div>
          <Tabbar arrayOfTabs={arrayOfTabs} setValue={setTab} value={tab}>
            <PostingScreen
              setValue={setTab}
              value={tab}
              initValues={{ id: id, label: name, type: type }}
            />
          </Tabbar>
        </DialogTemplate>
      </Stack>
    </Modal>
  );
};
