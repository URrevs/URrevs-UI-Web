import { useTheme } from "@emotion/react";
import {
  alpha,
  Avatar,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller,
} from "react-virtualized";
import { CompanyHorizontalList } from "../Components/CompanyHorizontalList/CompanyHorizontalList";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { PAPER_BORDER_RADIUS_DESKTOP } from "../constants";
import ROUTES_NAMES from "../RoutesNames";
import {
  useGetAllCompaniesQuery,
  useGetAllPhonesQuery,
} from "../services/phones";
import { productListActions } from "../store/allProductsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const productCache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: 24,
});

const companyCache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: 24,
});

let maxIndex = 0;
let maxCompanyIndex = 0;

export function AllProductsScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const textContainer = useAppSelector((state) => state.language.textContainer);

  useEffect(() => {
    console.log("clear reviews");
    clearProductsList();
    return () => {
      console.log("clear reviews");
      clearProductsList();
      maxIndex = 0;
    };
  }, []);

  const clearProductsList = () => {
    dispatch(productListActions.clearProducts());
  };

  const currentUser = useAppSelector((state) => state.auth);

  const productsList = useAppSelector((state) => state.productList.newProducts);

  const companiesList = useAppSelector(
    (state) => state.productList.newCompanies
  );

  const [companyPage, setCompanyPage] = useState(1);

  const [queryParams, setQueryParams] = useState({
    page: 1,
    selectedCompany: { index: -1, id: null },
  });

  const { data, isLoading, isFetching, error } = useGetAllPhonesQuery(
    {
      round: queryParams.page,
      companyId: queryParams.selectedCompany.id,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const {
    data: companiesData,
    isLoading: companiesIsLoading,
    isFetching: companiesIsFetching,
    error: companiesError,
  } = useGetAllCompaniesQuery(companyPage);

  const addToProductsList = () =>
    dispatch(
      productListActions.addToLoaddedProducts({
        newProducts: data,
      })
    );

  const addToCompaniesList = () =>
    dispatch(
      productListActions.addToLoaddedCompanies({
        newCompanies: companiesData,
      })
    );

  const increasePage = () => {
    setQueryParams({
      selectedCompany: {
        index: queryParams.selectedCompany.index,
        id: queryParams.selectedCompany.id,
      },
      page: queryParams.page + 1,
    });
  };
  const increaseCompanyPage = () => setCompanyPage(companyPage + 1);

  const theme = useTheme();
  const listRef = useRef();

  const selectCompanyHandler = (index, id) => {
    clearProductsList();
    maxIndex = 0;
    window.scrollTo(0, 0);

    console.log("increased", queryParams.page);

    queryParams.selectedCompany.index === index
      ? setQueryParams({ page: 1, selectedCompany: { index: -1, id: null } })
      : setQueryParams({ page: 1, selectedCompany: { index: index, id: id } });
  };

  useEffect(() => {
    if (data) {
      addToProductsList();
      // if (page < 2 && !isLoading && !isFetching) {
      //   increasePage();
      // }
    }
  }, [data]);

  useEffect(() => {
    if (companiesData) {
      addToCompaniesList();
      if (companyPage < 1 && !companiesIsFetching && !companiesIsLoading) {
        increaseCompanyPage();
      }
    }
  }, [companiesData]);

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
      <Link style={{ textDecoration: "none" }} to={to}>
        <ListItem
          disablePadding
          dense
          key={title}
          style={{
            padding: "9px 0",
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
          <ListItemButton
            sx={{
              padding: 0,

              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Avatar
              sx={{
                margin: "0px 17px 0px 13px",
              }}
            >
              <img
                alt=""
                objectFit="contain"
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
      </Link>
    );
  };

  const renderCompany = (title, imgSrc, index, id) => {
    return (
      <ListItem
        onClick={selectCompanyHandler.bind(this, index, id)}
        disablePadding
        dense
        key={title}
        style={{
          borderRadius: 10,
          backgroundColor:
            queryParams.selectedCompany.index === index
              ? alpha(
                  theme.palette.allProductsScreen.selectedItemBackground,
                  0.8
                )
              : "transparent",
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
        <ListItemButton
          sx={{
            padding: 0,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Avatar
            sx={{
              margin: "10px 14px 10px 14px",
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
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const renderProductOnDesktop = (title, imgSrc, to) => (
    <div>
      <Paper
        // elevation={3}
        sx={{
          margin: "0px 3px",
          borderRadius: `${PAPER_BORDER_RADIUS_DESKTOP}px`,
          boxShadow: 3,
          "&:hover": {
            backgroundColor: theme.palette.hover,
          },
        }}
      >
        {renderProduct(title, imgSrc, to)}
      </Paper>
      <div
        style={{
          height: "20px",
        }}
      ></div>
    </div>
  );

  const renderRow = ({ index, key, style, parent }) => {
    if (
      maxIndex !== 0 &&
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
        <CellMeasurer
          cache={productCache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <div style={{ ...style, direction: theme.direction }}>
            {index >= productsList.length ? (
              data.length === 0 ? (
                <div>لا يوجد عناصر</div>
              ) : (
                [...Array(1)].map((a, index) => (
                  <div
                    style={{
                      padding: "8px",
                    }}
                  >
                    <LoadingSpinner />
                  </div>
                ))
              )
            ) : (
              <Fragment>
                {theme.isMobile
                  ? renderProduct(
                      item.name,
                      item.companyLogo,
                      `/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.SPECS}?pid=${item._id}`
                    )
                  : renderProductOnDesktop(
                      item.name,
                      item.companyLogo,
                      `/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.SPECS}?pid=${item._id}`
                    )}
              </Fragment>
            )}
          </div>
        </CellMeasurer>
      </div>
    );
  };

  const renderCompanyRow = ({ index, key, style, parent }) => {
    if (
      maxCompanyIndex !== 0 &&
      !companiesIsLoading &&
      !companiesIsFetching &&
      companyPage >= 1 &&
      maxCompanyIndex === companiesList.length - 1 &&
      companiesData.length !== 0
    ) {
      maxCompanyIndex = 0;
      increaseCompanyPage();
    }
    maxCompanyIndex = Math.max(index, maxCompanyIndex);

    const item = companiesList[index];
    return (
      <div key={key}>
        {index >= companiesList.length ? (
          companiesData.length === 0 ? (
            <div>لا يوجد عناصر</div>
          ) : (
            [...Array(1)].map((a, index) => (
              <div
                style={{
                  padding: "8px",
                }}
              >
                <LoadingSpinner />
              </div>
            ))
          )
        ) : (
          <div style={{ ...style, direction: theme.direction }}>
            <CellMeasurer
              cache={companyCache}
              parent={parent}
              columnIndex={0}
              rowIndex={index}
            >
              {renderCompany(item.name, item.logo, index, item._id)}
            </CellMeasurer>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {!theme.isMobile && <div style={{ height: "20px" }} />}
      {/* company list */}
      {/* Right grid */}
      {!theme.isMobile && (
        <div
          style={{
            position: "fixed",
            top: "64px",
            maxHeight: "100vh",
            overflow: "scroll",
            background: "#FFF",
            padding: "0 12px 0 6px",
          }}
        >
          <Typography variant="S16W700C050505">الفلاتر:</Typography>
          <div style={{ height: "calc(85vh)" }}>
            <div>
              <List
                ref={listRef}
                autoHeight
                overscanRowCount={10}
                width={250}
                height={companiesList.length * 300}
                rowHeight={companyCache.rowHeight}
                rowCount={companiesList.length}
                rowRenderer={renderCompanyRow}
              />
            </div>
          </div>
        </div>
      )}

      <div>
        {/* CustomAppBar appears only on mobile */}
        <CustomAppBar
          showLogo
          showProfile
          showSearch
          tabBar={
            <React.Fragment>
              <CompanyHorizontalList
                companiesList={companiesList}
                selectCompanyHandler={selectCompanyHandler}
                selectedCompany={queryParams.selectedCompany}
              />
            </React.Fragment>
          }
        >
          <Grid container>
            {/* Right grid */}
            {/* company list space */}
            <Grid item xl={2} lg={5} md={5} sm={0} xs={0}></Grid>
            <Grid item xl={2} lg={0} md={0} sm={0} xs={0}></Grid>
            <Grid item xl={6} lg={6} md={7} sm={12} xs={12}>
              {
                <div style={{ height: "calc(100vh)", margin: "0px 0" }}>
                  <AutoSizer>
                    {({ height, width }) => {
                      return (
                        <WindowScroller>
                          {({
                            height,
                            isScrolling,
                            registerChild,
                            scrollTop,
                          }) => (
                            <div ref={registerChild}>
                              <List
                                ref={listRef}
                                autoHeight
                                overscanRowCount={10}
                                isScrolling={isScrolling}
                                scrollTop={scrollTop}
                                width={width}
                                height={height}
                                deferredMeasurementCache={productCache}
                                rowHeight={productCache.rowHeight}
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
              }
            </Grid>
            {/* Left Grid */}
            <Grid item xl={2} lg={1} md={0} sm={0} xs={0}></Grid>
          </Grid>
        </CustomAppBar>
      </div>
    </div>
  );
}
