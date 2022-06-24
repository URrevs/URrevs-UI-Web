import { useTheme } from "@emotion/react";
import { Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { TABCARD_BORDER_RADIUS } from "../../constants";
import { useAppSelector } from "../../store/hooks";

export const Tabbar = ({
  arrayOfTabs = [],
  setValue,
  isVertical = true,
  value,
}) => {
  const theme = useTheme();
  const language = useAppSelector((state) => state.language.language);
  const adjust = isVertical ? 1 : 0.5; //
  const space = (12 * adjust) / arrayOfTabs.length;
  const width = (1 / arrayOfTabs.length) * (100 * adjust); // 1/2 * 100 = 50
  const fscale = (arrayOfTabs.length - 1) * 100; // input 3 therefore fullscale = 200
  const isAr = language === "ar";

  const [translation, setTranslation] = React.useState(isAr ? fscale : 0);
  const handleTranslation = (id) => {
    if (isAr) {
      let x = fscale - 100 * id;
      if (isVertical) setTranslation(x);
      else {
        x = fscale + 100 + x;
        setTranslation(x);
      }
    } else {
      setTranslation(100 * id);
    }
  };
  return (
    <React.Fragment>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#FFF", //Add theme
          borderRadius: `${TABCARD_BORDER_RADIUS}px`,
          minHeight: "35px",
          marginBottom: "12px",

          position: "relative",
        }}
      >
        <div></div>
        <Grid container spacing={0}>
          {arrayOfTabs.map((tab, id) => (
            <React.Fragment key={tab}>
              <Grid
                item
                onClick={() => {
                  setValue(id);
                  handleTranslation(id);
                }}
                xs={space}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  // borderBottom: value === id ? "3px solid #22CBF4" : null,
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
                {isVertical ? (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ marginLeft: "-1px" }}
                  />
                ) : null}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <div
          style={{
            position: "absolute",

            width: `${width}%`,
            left: "0%",
            background: "#22CBF4",
            height: "4px",
            bottom: "0px",
            transition: "0.5s",
            transform: `translateX(${translation}%)`,
          }}
        ></div>
      </Card>
    </React.Fragment>
  );
};
