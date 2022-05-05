import { useTheme } from "@emotion/react";
import { Button, Card, Typography } from "@mui/material";
import React from "react";

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
          variant="outlined"
          sx={{
            padding: "3px 0px",
            mr: "20px",
            fontSize: "14px",
            fontWeight: "700",
            borderRadius: "26px",
            borderColor: "#65676B",
            color: "#65676B",
            backgroundColor: "#FFF",
            "&:hover": {
              borderColor: "#65676B",
            },
            "&:focus": {
              backgroundColor: "#65676B",
              borderColor: "#65676B",
              color: "#FFF",
            },
          }}
          onClick={() => {
            setValue(0);
          }}
        >
          الهواتف
        </Button>

        <Button
          variant="outlined"
          sx={{
            padding: "3px 0px",
            mr: "20px",
            fontSize: "14px",
            fontWeight: "700",
            borderRadius: "26px",
            borderColor: "#65676B",
            color: "#65676B",
            backgroundColor: "#FFF",
            "&:hover": {
              borderColor: "#65676B",
            },
            "&:focus": {
              backgroundColor: "#65676B",
              borderColor: "#65676B",
              color: "#FFF",
            },
          }}
        >
          الشركات
        </Button>
      </Card>
    </React.Fragment>
  );
};
