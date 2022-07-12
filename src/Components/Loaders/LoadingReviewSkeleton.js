import { useTheme } from "@emotion/react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import React, { useEffect } from "react";

export const loadingSkeletonHeight = 320;

const LoadingReviewSkeleton = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        direction: theme.direction,
        height: loadingSkeletonHeight,
      }}
    >
      <Card
        sx={{
          width: "100%",
          margin: "15px 0px",
        }}
      >
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          action={null}
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="pulse" height={10} width="40%" />}
        />

        <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />

        <CardContent>
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingReviewSkeleton;
