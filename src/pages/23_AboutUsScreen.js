import { Stack, Typography } from "@mui/material";
import React from "react";
import { AlonePostsGrid } from "../Components/Grid/AlonePostsGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { useAppSelector } from "../store/hooks";

export const AboutUsScreen = () => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  return (
    <CustomAppBar label={textContainer.aboutUs} showLabel showBackBtn>
      <AlonePostsGrid>
        <Stack
          spacing={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div></div>
          <img
            height="auto"
            width="60%"
            alt="URrevs"
            src="/images/full_logo.png"
          />
          <Typography variant="S22W500C050505">
            {textContainer.aboutUsContent}
          </Typography>
        </Stack>
      </AlonePostsGrid>
    </CustomAppBar>
  );
};
