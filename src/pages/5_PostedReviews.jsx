import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { FilterTabbar } from "../Components/Tabbar/FilterTabbar";
import { PostedCompanyReviews } from "./5_PostedCompanyReviews";
import { PostedPhoneReviews } from "./5_PostedPhoneReviews";
import { ProfileTabbar } from "../Components/Tabbar/Desktop/ProfileTabbar";

export function PostedReviews() {
  const [filter, setFilter] = useState(0);

  const isMobile = useTheme().isMobile;

  return (
    <CustomAppBar
      showLabel
      label="مراجعاتي"
      showBackBtn
      tabBar={<FilterTabbar value={filter} setValue={setFilter} />}
    >
      {!isMobile ? (
        <ProfileTabbar
          children={
            <FixedGrid>
              {filter === 0 ? <PostedPhoneReviews /> : <PostedCompanyReviews />}
            </FixedGrid>
          }
          arrayOfTabs={["المراجعات", "الاسئلة المطروحة", "المنتجات الممتكلة"]}
        ></ProfileTabbar>
      ) : (
        <FixedGrid>
          {filter === 0 ? <PostedPhoneReviews /> : <PostedCompanyReviews />}
        </FixedGrid>
      )}
    </CustomAppBar>
  );
}
