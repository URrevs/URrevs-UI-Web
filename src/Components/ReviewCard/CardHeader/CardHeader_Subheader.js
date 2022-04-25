import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Typography from "@mui/material/Typography";
import * as React from "react";

const CardSubheader = ({ reviewDate, buyDate }) => {
  return (
    <React.Fragment>
      <div style={{}}>
        <Typography variant="S14W400C65676b">
          {reviewDate.split(" ")[0]}
        </Typography>
        <Typography variant="S14W700C050505"> • </Typography>

        <Typography variant="S14W400C65676b">
          {"امتلكه منذ " + buyDate.split(" ")[0]}
        </Typography>
        <Typography variant="S14W700C050505"> •</Typography>

        <Typography variant="S14W400C65676b">
          <RemoveRedEyeIcon
            style={{
              fontSize: "19",
              verticalAlign: "middle",
              margin: "0 2px",
            }}
          />
          100
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default CardSubheader;
