import { Link } from "react-router-dom";
import React from "react";

export const ConditionalLink = ({
  children,
  to,
  condition,
  removeStyle = true,
}) => {
  return condition ? (
    <Link
      to={to}
      style={{
        color: removeStyle && "inherit",
        textDecoration: removeStyle && "inherit",
      }}
    >
      {children}
    </Link>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};
