import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Grid } from "react-virtualized";
import CardStyled from "../CardStyled";

export const HorizontalPhoneList = ({ items = [] }) => {
  //   items = [
  //     {
  //       name: "Samsung Galaxy A52s",
  //       imgSrc: "https://m.media-amazon.com/images/I/41o9nGF3rPL._AC_SY580_.jpg",
  //     },
  //     {
  //       name: "Samsung Galaxy A52s",
  //       imgSrc: "https://m.media-amazon.com/images/I/41o9nGF3rPL._AC_SY580_.jpg",
  //     },
  //     {
  //       name: "Samsung Galaxy A52s",
  //       imgSrc: "https://m.media-amazon.com/images/I/41o9nGF3rPL._AC_SY580_.jpg",
  //     },
  //     {
  //       name: "Samsung Galaxy A52s",
  //       imgSrc: "https://m.media-amazon.com/images/I/41o9nGF3rPL._AC_SY580_.jpg",
  //     },
  //     {
  //       name: "Samsung Galaxy A52s",
  //       imgSrc: "https://m.media-amazon.com/images/I/41o9nGF3rPL._AC_SY580_.jpg",
  //     },
  //   ];
  const renderItem = (name, imgSrc, id) => {
    return (
      <Box
        key={id}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "12px 15px 0px 15px",
          textAlign: "center",
        }}
      >
        <img
          alt="band"
          style={{
            maxWidth: "94px",
          }}
          src={imgSrc}
        ></img>
        <Typography variant="S18W500C050505">{name}</Typography>
      </Box>
    );
  };
  return (
    <React.Fragment>
      <CardStyled>
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
          direction="row"
        >
          {items.map((item) => renderItem(item.name, item.picture, item._id))}
        </Box>
      </CardStyled>
    </React.Fragment>
  );
};
