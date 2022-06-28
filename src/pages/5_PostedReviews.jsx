import { useState } from "react";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { FilterTabbar } from "../Components/Tabbar/FilterTabbar";
import { PostedCompanyReviews } from "./5_PostedCompanyReviews";
import { PostedPhoneReviews } from "./5_PostedPhoneReviews";

export function PostedReviews() {
  const [filter, setFilter] = useState(0);

  return (
    <CustomAppBar
      showLabel
      label="مراجعاتي"
      showBackBtn
      tabBar={<FilterTabbar value={filter} setValue={setFilter} />}
    >
      <FixedGrid>
        {filter === 0 ? <PostedPhoneReviews /> : <PostedCompanyReviews />}
      </FixedGrid>
    </CustomAppBar>
  );
}
