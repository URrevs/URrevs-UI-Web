import { useTheme } from "@emotion/react";
import { Box, Card, Divider, Grid } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFitText from "use-fit-text";
import { TABCARD_BORDER_RADIUS } from "../../constants";
import { useAppSelector } from "../../store/hooks";

export const PathTabbar = ({
  arrayOfTabs = [],
  isVertical = true,
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // set tab indicator on current route
  let currentPath = location.pathname.split("/").slice(-1)[0];
  let pathValue = arrayOfTabs.findIndex(
    (element) => element.to.split("?")[0] === currentPath
  );

  const [value, setValue] = React.useState(pathValue === -1 ? 0 : pathValue);

  React.useEffect(() => {
    currentPath = location.pathname.split("/").slice(-1)[0];
    pathValue = arrayOfTabs.findIndex(
      (element) => element.to.split("?")[0] === currentPath
    );

    setValue(pathValue === -1 ? 0 : pathValue);
  }, [location.pathname]);

  const language = useAppSelector((state) => state.language.language);
  const adjust = isVertical ? 1 : 0.5; //
  const space = (12 * adjust) / arrayOfTabs.length;
  const width = (1 / arrayOfTabs.length) * (100 * adjust); // 1/2 * 100 = 50
  const fscale = (arrayOfTabs.length - 1) * 100; // input 3 therefore fullscale = 200
  const isAr = language === "ar";

  const [translation, setTranslation] = React.useState(
    isAr ? (isVertical ? fscale - 100 * value : fscale * 2 + 100) : 100 * value
  );
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

  const { fontSize, ref } = useFitText({
    maxFontSize: 100,
  });
  //Fix for indicator not changing when pressing backspace
  React.useEffect(() => {
    handleTranslation(value);
  }, [value]);
  return (
    <React.Fragment>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          // backgroundColor: "#FFF", //Add theme
          borderRadius: `${TABCARD_BORDER_RADIUS}px`,
          minHeight: "35px",
          marginBottom: "12px",
          border: "1px solid transparent",

          position: "relative",
        }}
      >
        {/* Equal spacing tabbars */}
        <Grid container spacing={0}>
          {arrayOfTabs.map((tab, id) => (
            <React.Fragment key={tab.title}>
              <Grid
                item
                onClick={() => {
                  navigate(tab.to);
                  setValue(id);
                  handleTranslation(id);
                }}
                xs={space}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  // "&:hover": {
                  //   backgroundColor: theme.palette.hover,
                  // },
                  transition: "all 0.7s ease",

                  // borderBottom: value === id ? "3px solid #22CBF4" : null,
                }}
              >
                <div
                  ref={ref}
                  style={{
                    maxWidth: "calc(90vw / 3)",
                    ...(value === id
                      ? theme.typography.S18W800C050505
                      : theme.typography.S18W300C050505),
                    fontSize: fontSize,
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.title}
                </div>
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
                  arrayOfTabs.length !== id + 1 ? (
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ marginLeft: "-1px" }}
                    />
                  ) : null
                ) : null}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        {/* Tabbar Indicator */}
        <div
          style={{
            position: "absolute",

            width: `${width}%`,
            left: "0%",
            background: "#22CBF4",
            height: "4px",
            bottom: "0px",
            transition: "0.39s",
            transform: `translateX(${translation}%)`,
          }}
        ></div>
      </Card>
      <Box>{children}</Box>
    </React.Fragment>
  );
};
