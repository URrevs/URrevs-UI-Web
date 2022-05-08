import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

export default function BottomTabBar() {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const divider = () => {
    return (
      <div
        style={{
          width: "1px",
          height: "100%",
          background: "#000",
          marginTop: "2px",
        }}
      ></div>
    );
  };

  const tab = (text) => {
    return (
      <Button style={{ display: "flex" }}>
        <Typography variant="S18W300C050505">{text}</Typography>
      </Button>
    );
  };

  return (
    <div
      style={{
        borderRadius: "0px 0px 15px 15px",
        display: "flex",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        padding: "0px 10px",
        boxShadow: 2,
      }}
    >
      <div>{tab("المراجعات")}</div>

      <div>{divider()}</div>
      <div>{tab("الاسئلة والاجوبة")}</div>

      {/* {divider()}
      <div>{tab("المواصفات")} </div> */}
    </div>
  );
}
