import { useTheme } from "@emotion/react";
import { Button, Card, Typography } from "@mui/material";
import React from "react";
import { FILTER_BUTTON_BORDER_RADIUS } from "../../constants";

export const FilterTabbar = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  return (
    <React.Fragment>
      <Card
        elevation={3}
        sx={{
          padding: "6px 0px 5px 17px",
          minHeight: "45px",
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <Button
          sx={{
            border: `0.5px solid ${theme.palette.filterTabbar.borderColor}`,
            backgroundColor:
              value === 0
                ? theme.palette.filterTabbar.borderColor
                : theme.palette.filterTabbar.buttonBg,
            borderRadius: FILTER_BUTTON_BORDER_RADIUS,
            padding: "3px 0px",
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
            الهاتف
          </Typography>
        </Button>

        <Button
          sx={{
            border: "0.5px solid #606266",
            backgroundColor:
              value === 1
                ? theme.palette.filterTabbar.buttonBgActive
                : theme.palette.filterTabbar.buttonBg,
            borderRadius: "26px",
            padding: "3px 0px",
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
            الشركات
          </Typography>
        </Button>
      </Card>
    </React.Fragment>
  );
};
