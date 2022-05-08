import { useTheme } from "@emotion/react";
import { Button, Card, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { FILTER_BUTTON_BORDER_RADIUS } from "../../constants";
import { useNavigate, useLocation } from "react-router-dom";

export const FilterTabbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = React.useState(
    location.pathname === "/user-profile/my-reviews/companies" ? 1 : 0
  );

  const textContainer = useSelector((state) => state.language.textContainer);
  const theme = useTheme();
  return (
    <React.Fragment>
      <Card
        elevation={3}
        sx={{
          padding: "6px 0px 5px 17px",
          minHeight: "45px",
          borderRadius: "0px 0px 10px 10px",
          margin: "0",
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
            textTransform: "none",
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
            navigate("../phones");
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
            border: "0.5px solid #606266",
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
            navigate("../companies");
          }}
        >
          <Typography
            variant={value === 1 ? "S14W700CFFFFFF" : "S14W700C65676B"}
          >
            {textContainer.companies}
          </Typography>
        </Button>
      </Card>
    </React.Fragment>
  );
};
