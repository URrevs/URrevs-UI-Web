import { useTheme } from "@emotion/react";
import { Box, Fab, Typography } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaButton } from "../Components/Buttons/FaButton";
import AddIcon from "@mui/icons-material/Add";

import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { PostingComponent } from "../Components/PostingComponents/PostingComponent";
import { FilterTabbar } from "../Components/Tabbar/FilterTabbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { postingModalActions } from "../store/uiPostingModalSlice";
import { PostedCompanyReviews } from "./5_PostedCompanyReviews";
import { PostedPhoneReviews } from "./5_PostedPhoneReviews";

export function PostedReviews() {
  const [filter, setFilter] = useState(0);
  const dispatch = useAppDispatch();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const theme = useTheme();
  const isMobile = theme.isMobile;

  const currentUserId = useAppSelector((state) => state.auth.uid);

  const [searchParams] = useSearchParams();
  const paramId = searchParams.get("userId");

  return (
    <CustomAppBar
      showLabel
      label={
        currentUserId === paramId
          ? textContainer.myReviews
          : textContainer.reviews
      }
      showBackBtn
      tabBar={<FilterTabbar value={filter} setValue={setFilter} />}
    >
      {theme.isMobile && currentUserId === paramId && (
        <Fab
          onClick={() => {
            dispatch(
              postingModalActions.showPostingModal({
                tab: 0,
              })
            );
          }}
          variant="circular"
          disableFocusRipple
          disableRipple
          sx={{
            background: "#2196F3",
            position: "fixed",
            bottom: "15px",
            borderRadius: "",
            right: "15px",
            // width: "50px",
            // height: "50px",
            // textTransform: "none",

            zIndex: 5,
            "&:hover": {
              background: "#2196F3",
            },
            transition: "all 0.6s ease",
          }}
        >
          <AddIcon
            sx={{
              color: theme.palette.defaultRedBtnIconColor,
              fontSize: "28px",
            }}
          />
        </Fab>
      )}
      <FixedGrid>
        <div style={{ marginTop: "20px" }}>
          {currentUserId === paramId && (
            <div>
              <PostingComponent
                label={textContainer.youCanAddReview}
                placeholder={textContainer.writeYourReview}
                params={{
                  disabled: true,
                  onClick: () => {
                    dispatch(
                      postingModalActions.showPostingModal({
                        tab: 0, //AddReview Tab
                      })
                    );
                  },
                }}
              />
              <div style={{ marginTop: "18px" }}></div>
            </div>
          )}
        </div>
        {!isMobile && (
          <FilterTabbar
            withBackground={false}
            value={filter}
            setValue={setFilter}
          />
        )}
        {filter === 0 ? <PostedPhoneReviews /> : <PostedCompanyReviews />}
      </FixedGrid>
    </CustomAppBar>
  );
}
