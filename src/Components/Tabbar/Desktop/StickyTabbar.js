import { Card, Tab, Tabs } from "@mui/material";
import React from "react";

export const StickyTabbar = ({ userPhoto }) => {
  const [value, setValue] = React.useState(0);

  const arrayOfTabs = [
    {
      value: 0,
      label: "المراجعات",
    },
    { value: 1, label: "الاسئلة المطروحة" },
    { value: 2, label: "المنتجات الممتلكة" },
  ];
  const handleChange = (event, id) => {
    setValue(id);
  };
  return (
    <Card
      style={{
        position: "sticky",
        justifyContent: "space-between",
        display: "flex",
        top: "64px",
        padding: "0px 150px 0px 150px",
        width: "100%",
        zIndex: "10",
      }}
    >
      <Tabs value={value} onChange={handleChange}>
        {arrayOfTabs.map((tab) => (
          <Tab value={tab.value} label={tab.label} />
        ))}
      </Tabs>
      {userPhoto()}
    </Card>
  );
};
