import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
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

  const currentUserId = useAppSelector((state) => state.auth.uid);

  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("userId");

  return (
    <CustomAppBar
      showLabel
      label="الاسئلة"
      showBackBtn
      tabBar={<FilterTabbar value={filter} setValue={setFilter} />}
    >
      <FixedGrid>
        <div style={{ marginTop: "20px" }}>
          {currentUserId === paramId && (
            <div>
              <PostingComponent
                label={textContainer.youCanAddQuestion}
                placeholder={textContainer.writeYourQuestionP}
                params={{
                  disabled: true,
                  onClick: () => {
                    dispatch(
                      postingModalActions.showPostingModal({
                        tab: 1, //Question Tab
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
        {filter === 0 ? <PostedPhoneQuestions /> : <PostedCompanyQuestions />}
      </FixedGrid>
    </CustomAppBar>
  );
}
