import { Button, Card, Typography } from "@mui/material";
import React from "react";

export const FilterTabbar = () => {
  return (
    <React.Fragment>
      <Card
        elevation={3}
        sx={{
          padding: "6px 0px 5px 17px",
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            padding: "8px",
            mr: "20px",
            fontSize: "14px",
            fontWeight: "700",
            borderRadius: "26px",
            borderColor: "#65676B",
            color: "#65676B",
            backgroundColor: "#FFF",
            // "&:active": {
            //   backgroundColor: "#65676B",
            //   borderColor: "#65676B",
            // },
            "&:focus": {
              backgroundColor: "#65676B",
              borderColor: "#65676B",
              color: "#FFF",
            },

            // borderColor: "#65676B",
          }}
        >
          الهواتف
        </Button>

        <Button
          variant="outlined"
          sx={{
            padding: "8px",
            mr: "20px",
            fontSize: "14px",
            fontWeight: "700",
            borderRadius: "26px",
            borderColor: "#65676B",
            color: "#65676B",
            backgroundColor: "#FFF",
            // "&:active": {
            //   backgroundColor: "#65676B",
            //   borderColor: "#65676B",
            // },
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
