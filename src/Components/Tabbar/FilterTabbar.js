import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { FILTER_BUTTON_BORDER_RADIUS } from "../../constants";

export const FilterTabbar = ({
  value = 0,
  setValue,
  withBackground = true,
}) => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const theme = useTheme();
  return (
    <React.Fragment>
      <Box
        elevation={3}
        sx={{
          background: withBackground && theme.palette.filterTabbar.tabbarBg,
          padding: "6px 0px 5px 0px",
          minHeight: "45px",
          borderRadius: "0px 0px 10px 10px",
          margin: "0",
          paddingLeft: withBackground && "17px",
        }}
      >
        <Button
          sx={{
            border: `0.5px solid ${
              value === 0
                ? theme.palette.filterTabbar.buttonBgActive
                : theme.palette.filterTabbar.borderColor
            }`,
            backgroundColor:
              value === 0
                ? theme.palette.filterTabbar.buttonBgActive
                : theme.palette.filterTabbar.buttonBg,
            borderRadius: FILTER_BUTTON_BORDER_RADIUS,
            padding: "3px 3px",
            mr: "20px",
            "&:active": {
              backgroundColor:
                value === 0
                  ? theme.palette.filterTabbar.buttonBgActive
                  : theme.palette.filterTabbar.buttonBg,
            },
            "&:hover": {
              backgroundColor:
                value === 0
                  ? theme.palette.filterTabbar.buttonBgActive
                  : theme.palette.filterTabbar.buttonBg,
            },
            "&:focus": {
              backgroundColor:
                value === 0
                  ? theme.palette.filterTabbar.buttonBgActive
                  : theme.palette.filterTabbar.buttonBg,
            },
          }}
          onClick={() => {
            setValue(0);
          }}
        >
          <Typography
            variant={value === 0 ? "S14W700CFFFFFF" : "S14W700C65676B"}
          >
            {textContainer.phones}
          </Typography>
        </Button>

        <Button
          sx={{
            border: `0.5px solid ${
              value === 1
                ? theme.palette.filterTabbar.buttonBgActive
                : theme.palette.filterTabbar.borderColor
            }`,
            textTransform: "none",
            backgroundColor:
              value === 1
                ? theme.palette.filterTabbar.buttonBgActive
                : theme.palette.filterTabbar.buttonBg,
            borderRadius: "26px",
            padding: "3px 3px",
            mr: "20px",
            "&:active": {
              backgroundColor:
                value === 1
                  ? theme.palette.filterTabbar.buttonBgActive
                  : theme.palette.filterTabbar.buttonBg,
            },
            "&:hover": {
              backgroundColor:
                value === 1
                  ? theme.palette.filterTabbar.buttonBgActive
                  : theme.palette.filterTabbar.buttonBg,
            },
            "&:focus": {
              backgroundColor:
                value === 1
                  ? theme.palette.filterTabbar.buttonBgActive
                  : theme.palette.filterTabbar.buttonBg,
            },
          }}
          onClick={() => {
            setValue(1);
          }}
        >
          <Typography
            variant={value === 1 ? "S14W700CFFFFFF" : "S14W700C65676B"}
          >
            {textContainer.companies}
          </Typography>
        </Button>
      </Box>
    </React.Fragment>
  );
};
