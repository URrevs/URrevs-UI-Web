import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { PostingComponent } from "../Components/PostingComponents/PostingComponent";
import { FilterTabbar } from "../Components/Tabbar/FilterTabbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { postingModalActions } from "../store/uiPostingModalSlice";
import { PostedCompanyQuestions } from "./7_PostedCompanyQuestions";
import { PostedPhoneQuestions } from "./7_PostedPhoneQuestions";

export function PostedQuestions() {
  const [filter, setFilter] = useState(0);
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const dispatch = useAppDispatch();
  const isMobile = useTheme().isMobile;

  return (
    <CustomAppBar
      showLabel
      label="الاسئلة"
      showBackBtn
      tabBar={<FilterTabbar value={filter} setValue={setFilter} />}
    >
      <FixedGrid>
        {!isMobile && (
          <div style={{ marginTop: "12px" }}>
            <PostingComponent
              label={textContainer.youCanAddQuestion}
              placeholder={textContainer.writeYourQuestionP}
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
            <FilterTabbar
              withBackground={false}
              value={filter}
              setValue={setFilter}
            />
          </div>
        )}
        {filter === 0 ? <PostedPhoneQuestions /> : <PostedCompanyQuestions />}
      </FixedGrid>
    </CustomAppBar>
  );
}
