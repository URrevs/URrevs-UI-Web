import { useTheme } from "@emotion/react";
import { Avatar, Card, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const StickyTabbar = ({ userPhoto, userProfile, arrayOfTabs }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [smallPfpVisible, setSmallPfpVisible] = React.useState(false);
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;

      if (scrolled > 100) setSmallPfpVisible(true);
      else setSmallPfpVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    //On window scroll set pfp true or false
    return (_) => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        zIndex: "1",
      }}
    >
      <Tabs value={value} onChange={handleChange}>
        {arrayOfTabs.map((tab, i) => (
          <Tab value={i} label={tab.title} onClick={() => navigate(tab.to)} />
        ))}
      </Tabs>
      {smallPfpVisible ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {
            <Avatar
              src={userPhoto}
              alt="User profile picture"
              sx={{
                mr: "8px",
                // height: `${height}px`,
                // width: `${width}px`,
                transition: "0.1s",
              }}
            />
          }
          <Typography variant="S18W700C050505">{userProfile.name}</Typography>
        </div>
      ) : null}
    </Card>
  );
};
