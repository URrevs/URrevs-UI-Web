import { Link } from "react-router-dom";
import React from "react";

export const ConditionalLink = ({ children, to, condition }) => {
  return condition ? (
    <Link to={to}>{children}</Link>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};
