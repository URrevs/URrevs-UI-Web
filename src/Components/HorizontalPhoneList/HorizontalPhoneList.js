import { Box, ListItemButton, Stack, List, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const renderItem = (name, imgSrc, id) => {
    return (
      <ListItemButton
        onClick={() => {
          // TODO: add routes names here
          navigate(`/phone/specs?pid=${id}`);
          window.scrollTo(0, 0);
        }}
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
      </ListItemButton>
    );
  };
  return (
    <React.Fragment>
      <CardStyled>
        <List
          sx={{
            overflowX: "scroll",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {items.map((item) => renderItem(item.name, item.picture, item._id))}
        </List>
      </CardStyled>
    </React.Fragment>
  );
};
