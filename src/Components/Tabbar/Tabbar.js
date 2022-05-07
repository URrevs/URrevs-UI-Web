import { useTheme } from "@emotion/react";
import { Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { TABCARD_BORDER_RADIUS } from "../../constants";

export const Tabbar = ({ arrayOfTabs = [], setValue, value }) => {
  const theme = useTheme();

  const space = 12 / arrayOfTabs.length;
  return (
    <React.Fragment>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#FFF", //Add theme
          borderRadius: `${TABCARD_BORDER_RADIUS}px`,
          minHeight: "35px",
        }}
      >
        <Grid container spacing={0}>
          {arrayOfTabs.map((tab, id) => (
            <React.Fragment key={tab}>
              <Grid
                item
                onClick={() => {
                  setValue(id);
                }}
                xs={space}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  borderBottom: value === id ? "3px solid #22CBF4" : null,
                }}
              >
                <Typography
                  {...(value === id
                    ? {
                        variant: "S18W800C050505",
                      }
                    : { variant: "S18W300C050505" })}
                >
                  {tab}
                </Typography>
              </Grid>
              <Grid
                item
                xs={0}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginLeft: "-1px" }}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Card>
    </React.Fragment>
  );
};
