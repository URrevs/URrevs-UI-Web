import React from "react";
import ROUTES_NAMES from "../RoutesNames";

export const AboutUsScreen = () => {
  //if true arabic if false english
  const language = window.location.pathname === `/${ROUTES_NAMES.ABOUT_US}/ar`;

  return language ? <div>عنا</div> : <div>About Us</div>;
};
