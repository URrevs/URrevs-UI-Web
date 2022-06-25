import { Box, Card, Tab, Tabs } from "@mui/material";
import React from "react";
import { FixedGrid } from "../../Grid/FixedGrid";

export const StickyTabbar = ({ stickyRef }) => {
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
      ref={stickyRef}
      style={{
        position: "sticky",
        top: "64px",
        width: "100%",
      }}
    >
      <FixedGrid>
        <Tabs value={value} onChange={handleChange}>
          {arrayOfTabs.map((tab) => (
            <Tab value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </FixedGrid>
    </Card>
  );
};
