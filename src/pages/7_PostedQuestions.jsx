import React, { useState } from "react";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { FilterTabbar } from "../Components/Tabbar/FilterTabbar";
import { PostedCompanyQuestions } from "./7_PostedCompanyQuestions";
import { PostedPhoneQuestions } from "./7_PostedPhoneQuestions";

export function PostedQuestions() {
  const [filter, setFilter] = useState(0);

  return (
    <CustomAppBar
      showLabel
      label="الاسئلة"
      showBackBtn
      tabBar={<FilterTabbar value={filter} setValue={setFilter} />}
    >
      <FixedGrid>
        {filter === 0 ? <PostedPhoneQuestions /> : <PostedCompanyQuestions />}
      </FixedGrid>
    </CustomAppBar>
  );
}
