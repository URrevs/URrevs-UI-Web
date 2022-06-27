import { useTheme } from "@emotion/react";
import { Card, Tab, Tabs, Typography } from "@mui/material";
import React from "react";

export const StickyTabbar = ({ userPhoto, userProfile }) => {
  const theme = useTheme();
  const [smallPfpVisible, setSmallPfpVisible] = React.useState(false);
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      console.log(scrolled);
      if (scrolled > 100) setSmallPfpVisible(true);
      else setSmallPfpVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    //On window scroll set pfp true or false
    return (_) => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
      sx={{
        position: smallPfpVisible ? "fixed" : "sticky",
        justifyContent: "space-between",
        display: "flex",
        top: "64px",
        padding: "0px 200px",
        [theme.breakpoints.down("xl")]: {
          padding: "0px 150px",
        },
        [theme.breakpoints.down("lg")]: {
          padding: "0px 50px",
        },
        // padding: "0px 150px 0px 150px",
        width: "100%",
        zIndex: "10",
      }}
    >
      <Tabs value={value} onChange={handleChange}>
        {arrayOfTabs.map((tab) => (
          <Tab value={tab.value} label={tab.label} />
        ))}
      </Tabs>
      {smallPfpVisible ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {userPhoto()}
          <Typography variant="S18W700C050505">{userProfile.name}</Typography>
        </div>
      ) : null}
    </Card>
  );
};
