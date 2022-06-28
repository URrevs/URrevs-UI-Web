import { useTheme } from "@emotion/react";
import { Avatar, Card, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const StickyTabbar = ({ userPhoto, userName, arrayOfTabs }) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const [smallPfpVisible, setSmallPfpVisible] = React.useState(false);

  // set tab indicator on current route
  const currentPath = location.pathname.split("/").slice(-1)[0];
  const pathValue = arrayOfTabs.findIndex(
    (element) => element.to.split("?")[0] === currentPath
  );

  console.log(currentPath, arrayOfTabs[0].to.split("?")[0], pathValue);

  const [value, setValue] = React.useState(pathValue === -1 ? 0 : pathValue);

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
          // <Link style={{ textDecoration: "none" }} to={tab.to}>
          <Tab value={i} label={tab.title} onClick={() => navigate(tab.to)} />
          // </Link>
        ))}
      </Tabs>
      {smallPfpVisible ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {userPhoto && (
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
          )}
          <Typography variant="S18W700C050505">{userName}</Typography>
        </div>
      ) : null}
    </Card>
  );
};
