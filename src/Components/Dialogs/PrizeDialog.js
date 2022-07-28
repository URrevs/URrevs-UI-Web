import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useAppSelector } from "../../store/hooks";
import { DialogTemplate } from "./DialogTemplate";

export const PrizeDialog = ({ prize, prizeImgSrc, handleClose }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  return (
    <Fragment>
      <DialogTemplate
        handleClose={handleClose}
        title={textContainer.competitionPrize}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="S22W800C050505">{prize}</Typography>
          <div
            style={{
              padding: "20px",
            }}
          >
            <img
              alt=""
              src={prizeImgSrc}
              style={{
                alignSelf: "center",
                margin: "10px 0px",
                width: "350px",
                height: "auto",
                borderRadius: "15px",

                // borderRadius: "15px",
              }}
            />
          </div>
        </Box>
      </DialogTemplate>
    </Fragment>
  );
};
