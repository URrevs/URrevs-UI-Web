import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
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
        currentUserId === paramId && (
          <FaButton
            icon={
              <AddIcon
                sx={{
                  color: theme.palette.defaultRedBtnIconColor,
                  fontSize: "28px",
                }}
              />
            }
            onClick={() => {
              dispatch(
                postingModalActions.showPostingModal({
                  tab: 0,
                })
              );
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="S14W700Cffffff">
                {textContainer.addReview}
              </Typography>
            </Box>
          </FaButton>
        )
      }
      showBackBtn
      tabBar={<FilterTabbar value={filter} setValue={setFilter} />}
    >
      {currentUserId === paramId
        ? textContainer.myReviews
        : textContainer.reviews}

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
