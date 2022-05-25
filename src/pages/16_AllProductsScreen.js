import { useTheme } from "@emotion/react";
import { Avatar, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller,
} from "react-virtualized";
import { CompanyHorizontalList } from "../Components/CompanyHorizontalList/CompanyHorizontalList";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { FilterTabbar } from "../Components/Tabbar/FilterTabbar";
import ROUTES_NAMES from "../RoutesNames";
import { useGetAllPhonesQuery } from "../services/phones";
import { productListActions } from "../store/allProductsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const cache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: 24,
});

let maxIndex = 0;

export function AllProductsScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const textContainer = useAppSelector((state) => state.language.textContainer);

  useEffect(() => {
    console.log("clear reviews");

    dispatch(productListActions.clearProducts());
  }, []);

  const currentUser = useAppSelector((state) => state.auth);

  const productsList = useAppSelector((state) => state.productList.newProducts);
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useGetAllPhonesQuery(page);

  const addToProductsList = () =>
    dispatch(
      productListActions.addToLoaddedProducts({
        newProducts: data,
      })
    );

  const increasePage = () => setPage(page + 1);

  const theme = useTheme();
  const listRef = useRef();
  const [ex, setEx] = useState(false);

  const clearCache = (index) => {
    setEx(!ex);
    if (index === 0) {
      cache.clear(0);
    } else {
      cache.clear(index);
    }
  };

  useEffect(() => {
    if (data) {
      addToProductsList();
      if (page < 2 && !isLoading && !isFetching) {
        increasePage();
      }
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error.status}
        {error.code}
        {error.message}
      </div>
    );
  }

  const renderProduct = (title, imgSrc, to) => {
    return (
      <ListItem
        onClick={() => {
          navigate(to);
        }}
        disablePadding
        dense
        key={title}
        style={{
          "&:hover": {
            backgroundColor: theme.palette.hover,
          },
          "&:active": {
            backgroundColor: theme.palette.hover,
          },
          "&:focus": {
            backgroundColor: theme.palette.hover,
          },
        }}
      >
        <ListItemButton sx={{ padding: 0 }}>
          <Avatar
            sx={{
              margin: "18px 17px 10px 13px",
            }}
          >
            <img
              alt=""
              objectfit="cover"
              width="40px"
              height="40px"
              src={imgSrc}
            />
          </Avatar>
          <ListItemText
            primaryTypographyProps={{
              ...theme.typography.S20W700C050505,
              lineHeight: 1,
            }}
            primary={title}
            secondaryTypographyProps={{ ...theme.typography.S16W400C65676B }}
            secondary={textContainer.smartphone}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const renderRow = ({ index, key, style, parent }) => {
    if (
      maxIndex !== 0 &&
      page >= 2 &&
      !isLoading &&
      !isFetching &&
      maxIndex === productsList.length &&
      data.length !== 0
    ) {
      maxIndex = 0;
      increasePage();
    }
    maxIndex = Math.max(index, maxIndex);

    const item = productsList[index];
    return (
      <div key={key}>
        {data.length === 0 ? (
          <div>No data</div>
        ) : index >= productsList.length ? (
          <div>Loading...</div>
        ) : (
          <div style={{ ...style, direction: theme.direction }}>
            <CellMeasurer
              cache={cache}
              parent={parent}
              columnIndex={0}
              rowIndex={index}
            >
              {renderProduct(
                item.name,
                "",
                `/${ROUTES_NAMES.PHONE_PROFILE}?pid=${item._id}`
              )}
            </CellMeasurer>
          </div>
        )}
      </div>
    );
  };

  return (
    <CustomAppBar
      showLabel
      label="مراجعاتي"
      showBackBtn
      tabBar={<FilterTabbar />}
    >
      <CompanyHorizontalList />

      <Fragment>
        <div style={{ height: "calc(100vh)", margin: "0px 0" }}>
          <AutoSizer>
            {({ height, width }) => {
              return (
                <WindowScroller>
                  {({ height, isScrolling, registerChild, scrollTop }) => (
                    <div ref={registerChild}>
                      <List
                        ref={listRef}
                        autoHeight
                        overscanRowCount={10}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                        width={width}
                        height={height}
                        deferredMeasurementCache={cache}
                        rowHeight={cache.rowHeight}
                        rowCount={productsList.length + 1}
                        rowRenderer={renderRow}
                      />
                    </div>
                  )}
                </WindowScroller>
              );
            }}
          </AutoSizer>
        </div>
      </Fragment>
    </CustomAppBar>
  );
}
