import Fab from "@mui/material/Fab";
import React from "react";
export const FaButton = ({ children, icon, onClick }) => {
  const [variant, setVariant] = React.useState("extended");
  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      console.log(window.scrollY);
      if (scrolled > 10) setVariant("circular");
      else setVariant("extended");
    };
    window.addEventListener("scroll", handleScroll);
    //On window scroll set pfp true or false
    return (_) => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Fab
      onClick={onClick}
      variant={variant}
      disableFocusRipple
      disableRipple
      sx={{
        background: "#2196F3",
        position: "fixed",
        bottom: "15px",
        zIndex: 5,
        "&:hover": {
          background: "#2196F3",
        },
        transition: "all 0.6s ease",
      }}
    >
      {icon}
      {variant === "extended" && children}
    </Fab>
  );
};
{
  /* <Button
      variant={variant}
      onScrollCapture={() => {
        console.log("a");
      }}
      onScroll={() => {
        console.log("b");
      }}
      //   onMouseOver={() => {
      //     setVariant("extended");
      //   }}
      sx={{
        borderRadius: variant === "extended" ? "15px" : "90px",
        background: "#2196F3",
        position: "fixed",
        bottom: "15px",
        padding: "30px",
        height: "50px",
        maxWidth: variant === "extended" ? "150px" : "50px",
        transition: "all 0.6s ease",
      }}
    >
      {icon}
      {variant === "extended" && children}
    </Button> */
}