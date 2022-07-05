import { useTheme } from "@emotion/react";
import { Fragment, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

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
  const isMobile = useTheme().isMobile;

  const currentUserId = useAppSelector((state) => state.auth.uid);

  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("userId");

  return (
    <CustomAppBar
      showLabel
      label="مراجعاتي"
      showBackBtn
      tabBar={<FilterTabbar value={filter} setValue={setFilter} />}
    >
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
