import { ThemeProvider } from "@emotion/react";
import {
  alpha,
  createTheme,
  CssBaseline,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { arEG } from "@mui/material/locale";
import { getAuth } from "firebase/auth";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useLazyXauthenticateQuery } from "../src/services/users";
import "./App.css";
import Layout from "./Components/MainLayout/Layout";
import { PostingModal } from "./Components/PostingComponents/PostingModal";
import RTL from "./Components/RTL";
import { ProductProfile } from "./pages/10_ProductProfile";
import { ComparisonScreen } from "./pages/11_ComparisonScreen";
import { CompanyProfile } from "./pages/14_CompanyProfile";
import { AllProductsScreen } from "./pages/16_AllProductsScreen";
import CompanyQuestionFullScreen from "./pages/17_CompanyQuestionFullScreen";
import PhoneQuestionFullScreen from "./pages/17_PhoneQuestionFullScreen";
import ReviewPostingScreen from "./pages/18_ReviewPostingScreen";
import Menu from "./pages/20_Menu";
import { SettingsScreen } from "./pages/21_SettingsScreen";
import { AboutUsScreen } from "./pages/23_AboutUsScreen";
import { TermsAndConditionsScreen } from "./pages/24_TermsAndConditionsScreen";
import { PrivacyPolicyScreen } from "./pages/25_PrivacyPolicyScreen";
import { AdminPanel } from "./pages/26_AdminPanel";
import { UpdateProducts } from "./pages/29_UpdateProducts";
import Reviews from "./pages/2_HomePageScrolling";
import CompanyReviewFullScreen from "./pages/3_CompanyReviewFullScreen";
import PhoneReviewFullScreen from "./pages/3_PhoneReviewFullScreen";
import { PostedReviews } from "./pages/5_PostedReviews";
import { PostedQuestions } from "./pages/7_PostedQuestions";
import { SearchScreen } from "./pages/8_SearchScreen";
import AddReview from "./pages/AddReview";
import { CompanyQuestions } from "./pages/CompanyProfileTabs/CompanyQuestions";
import { CompanyReviews } from "./pages/CompanyProfileTabs/CompanyReviews";
import { ComponentsTest } from "./pages/ComponentsTest";
import { Leaderboard } from "./pages/Leaderboard";
import { MyPhonesQuestions } from "./pages/MyPhonesQuestions";
import OwnedPhonesPage from "./pages/OwnedPhones";
import { ProductSpecsScreen } from "./pages/ProductProfileTabs/10_ProductSpecs";
import { ProductReviews } from "./pages/ProductProfileTabs/12_ProductReviews";
import { ProductQuestions } from "./pages/ProductProfileTabs/13_ProductQuestions";
import Profile from "./pages/Profile";
import { SplashScreen } from "./pages/SplashScreen";
import ROUTES_NAMES from "./RoutesNames";
import { authActions } from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { COLORS } from "./Styles/main_light_colors";
// OUR_TRACKING_ID
import ReactGA from "react-ga";
import { Footer } from "./Components/Banners/Footer";
import { getFonts } from "./Styles/fonts";
const TRACKING_ID = "UA-165221874-4";

function App() {
  // GOOGLE ANALITYCS
  ReactGA.initialize(TRACKING_ID);
  // for google analitycs to track all site pages
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const language = useSelector((state) => state.language.language);
  const direction = language === "ar" ? "rtl" : "ltr";
  const isDark = useSelector((state) => state.darkMode.isDark);
  const isMobile = useMediaQuery(`(max-width:768px)`);

  const darkThemeColors = {
    textFieldBackground: "#3A3B3C",
    negativeSpaceBackground: "#18191A",
    cardsColor: "#242526",
    interactionCardDesktop: "#3A3B3C",
    fontsColor: "#E4E6EB",
    iconsColor: "#B0B3B8",
    subtitles: "#B0B3B8",
    hintText: "#B0B3B8 ",
  };
  const fonts = getFonts(isDark);

  const theme = createTheme(
    {
      isMobile: isMobile,
      isDark: isDark,
      direction: `${direction}`,
      typography: fonts,
      colors: COLORS,
      components: {
        MuiTab: {
          styleOverrides: {
            root: {
              textTransform: "none",
              ...fonts.S14W400C050505,
              "&.Mui-selected": {
                ...fonts.S14W800C050505,
              },
            },
          },
        },
        //is seen in review cards
        MuiPaper: {
          styleOverrides: {
            root: {
              background: isDark && darkThemeColors.cardsColor,
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: isDark && darkThemeColors.cardsColor,
            },
          },
        },
        MuiFormHelperText: {
          styleOverrides: {
            root: {
              //Edit the font size for helperText here
              fontSize: "15px",
            },
          },
        },
        MuiTabs: {
          styleOverrides: {
            indicator: {
              backgroundColor: COLORS.c22cbf4,
            },
          },
        },
        MuiFormControlLabel: {
          styleOverrides: {
            label: {
              ...fonts.S16W500C050505,
              // fontWeight: "500",
              // fontSize: "16px",
              // color: COLORS.c050505,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              fontFamily: "Tajawal",
              fontWeight: "800",
              fontSize: "16px",
              textTransform: "none",
            },
          },
        },
      },

      breakpoints: {
        values: {
          xs: 0,
          sm: 640,
          md: 768,
          lg: 890,
          xl: 1100,
        },
      },
      // overrides: {
      //   MuiInput: {
      //     input: {
      //       "&::placeholder": {
      //         color: "black",
      //       },
      //       color: "white", // if you also want to change the color of the input, this is the prop you'd use
      //     },
      //   },
      // },
      sideBar: {
        height: "59px",
      },
      appBar: {
        zIndex: 1500,
      },
      footer: {
        zIndex: 1400,
      },
      drawer: { zIndex: 1450, width: "72px" },

      palette: {
        mode: isDark ? "dark" : "light",
        modalColor: isDark ? "#18191A" : COLORS.cffffff,
        appBar: {
          appBarColor: isDark ? darkThemeColors.cardsColor : COLORS.cffffff,
          appBarIconBackgroundColor: isDark ? "000" : COLORS.ce5e5e7,
          appBarIcon: isDark ? "#B0B3B8" : COLORS.c050505,
          backButton: isDark ? COLORS.cffffff : COLORS.c050505,
        },
        reviewCard: {
          reviewCardColor: isDark ? darkThemeColors.cardsColor : COLORS.cffffff,
          actionBtnIcon: isDark ? "#B0B3B8" : COLORS.c606266,
          actionBtnIconHighlight: isDark ? "#2196F3" : COLORS.c2196f3,
          actionBtnHover: isDark ? COLORS.c000000 : COLORS.c000000,
          actionBtnBG: isDark ? COLORS.c000000 : COLORS.c000000,
          expandIcon: COLORS.c4ed5f6,
          filledStarColor: isDark ? COLORS.c2196f3 : COLORS.c2196f3,
          outlinedStarColor: isDark ? COLORS.c65676b : COLORS.c050505,
          emptyStarColor: isDark ? COLORS.c65676b : COLORS.c65676b,
          reviewArrow: isDark ? COLORS.c65676b : COLORS.c65676b,
          indicatorColor: isDark ? COLORS.c65676b : COLORS.c2196f3,
        },
        drawer: {
          drawerColor: isDark ? darkThemeColors.cardsColor : COLORS.cffffff,
          drawerIcon: isDark ? darkThemeColors.iconsColor : COLORS.c050505,
          activePage: isDark ? "#383838" : COLORS.cdbdbdb,
          tileText: isDark ? COLORS.cffffff : COLORS.c000000,
        },
        searchBar: {
          searchBarColor: isDark ? "#3A3B3C" : COLORS.ce5e5e7,
          searchIcon: isDark ? "#B0B3B8" : COLORS.c050505,
        },
        deskTopSearchBar: {
          searchBarColor: isDark ? "#3A3B3C" : COLORS.ce5e5e7,
          searchIcon: isDark ? "#B0B3B8" : COLORS.c65676b,
        },
        interactionCard: {
          backgroundColor: isDark
            ? darkThemeColors.interactionCardDesktop
            : "#f0f2f5",
          backgroundMobileColor: isDark
            ? darkThemeColors.cardsColor
            : COLORS.cffffff,
          iconColor: isDark ? COLORS.c2196f3 : COLORS.c2196f3,
          buttonActiveColor: isDark ? COLORS.c2196f3 : COLORS.c2196f3,
        },
        productList: {
          backgroundColor: isDark ? darkThemeColors.cardsColor : COLORS.cffffff,
          mobileColor: isDark ? COLORS.cffffff : COLORS.c606266,
        },
        progressBar: {
          backgroundColor: isDark ? COLORS.cffffff : COLORS.cffffff,
          barColor: isDark ? COLORS.c2196f3 : COLORS.c2196f3,
          barBorder: isDark ? COLORS.cffffff : COLORS.c050505,
        },
        authenticationButtons: {
          googleButtonColor: isDark ? COLORS.cffffff : COLORS.c65676b,
          facebookButtonColor: isDark ? COLORS.cffffff : COLORS.c2196f3,
        },
        leaderBoard: {
          entryCard: isDark ? darkThemeColors.cardsColor : COLORS.cffffff,
          rankCircle: isDark ? COLORS.cffffff : COLORS.cf0f2f5,
        },
        bottomNavigationBar: {
          background: isDark ? "#18191A" : COLORS.cffffff,
          selectedTap: isDark ? "#2196F3" : COLORS.c2196f3,
          unselectedTap: isDark ? "#606266" : COLORS.c606266,
        },
        textField: {
          inputFieldBackground: isDark ? "#3A3B3C" : COLORS.cf9f9f9,
          inputFieldText: isDark ? "#18191A" : COLORS.c050505,
          postingFieldBackground: isDark ? "#3A3B3C" : COLORS.cf0f2f5,
          borderColor: isDark ? "#18191A" : COLORS.c606266,
        },
        checkbox: {
          borderColor: isDark ? "#18191A" : COLORS.c050505,
        },
        productRateCard: {
          addPlaylistIconColor: isDark ? "#18191A" : COLORS.c050505,
          barPrimaryColor: isDark ? "#18191A" : COLORS.c2196f3,
          barSecondaryColor: isDark ? "#18191A" : COLORS.cBADEFB,
        },
        allProductsScreen: {
          selectedItemBackground: isDark ? "#18191A" : COLORS.c2196f3,
          brandHover: isDark ? "#18191A" : COLORS.c2196f3,
        },
        dialogs: {
          textFieldInput: isDark ? darkThemeColors.cardsColor : COLORS.c050505,
        },
        filterTabbar: {
          buttonBgActive: isDark ? "#FFFFFF" : COLORS.c22cbf4,
          buttonBg: isDark ? "#FFFFFF" : COLORS.cffffff,
          borderColor: isDark ? "#FFFFFF" : COLORS.c606266,
          tabbarBg: isDark ? COLORS.c050505 : COLORS.cffffff,
        },
        iconColor: isDark ? darkThemeColors.iconsColor : COLORS.c606266, // Menu Icons
        sendIconColor: isDark ? COLORS.c2196f3 : COLORS.c2196f3, // Comment Icon
        blackIconColor: isDark ? darkThemeColors.iconsColor : COLORS.c050505, // X button
        defaultRedBtnIconColor: isDark ? COLORS.cCED0D4 : COLORS.cffffff,
        defaultIconColor: isDark ? COLORS.cCED0D4 : COLORS.c2196f3,
        cancel: isDark ? COLORS.cCED0D4 : COLORS.c050505,
        divider: isDark ? COLORS.cCED0D4 : COLORS.cCED0D4,
        defaultPageBtn: isDark ? COLORS.cCED0D4 : COLORS.c2196f3,
        hover: isDark ? COLORS.cCED0D4 : alpha(COLORS.c65676b, 0.1),
        background: {
          default: isDark ? "#18191a" : COLORS.cf0f2f5,
        },
      },
    },
    arEG
  );

  const dispatch = useAppDispatch();
  const refetchToken = useAppSelector((state) => state.auth.refetch);

  const storeUser = useAppSelector((state) => state.auth);

  const [getUserProfile, { isLoading }] = useLazyXauthenticateQuery();

  const [firebaseIsLoading, setFirebaseIsLoading] = useState(true);

  // test for polling interval to update token
  useEffect(() => {
    const intervalGetToken = window.setInterval(() => {
      dispatch(authActions.toggleRefetch({ refetch: true }));
    }, 3000000);
    return () => {
      console.log("Refreshing");
      clearInterval(intervalGetToken);
    };
  }, []);

  useEffect(async () => {
    dispatch(authActions.toggleRefetch({ refetch: false }));
    const unregisterObserver = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        if (refetchToken) {
          const { data } = await getUserProfile(user.accessToken);

          dispatch(
            authActions.login({
              isLoggedIn: true,
              accessToken: user.accessToken,
              apiToken: data.token,
              expiration: data.exp,
              isAdmin: data.admin,
              uid: data.profile._id,
              refCode: data.profile.refCode,
              photo: data.profile.picture,
              name: data.profile.name,
              points: data.profile.points,
              refetch: false,
            })
          );
          setFirebaseIsLoading(false);
        }
      } else {
        dispatch(authActions.logout());
        setFirebaseIsLoading(false);
      }
    });

    return () => {
      unregisterObserver();
    };
  }, [dispatch, refetchToken]);

  return (
    <ThemeProvider theme={theme}>
      <div dir={direction}>
        <CssBaseline enableColorScheme />
        <RTL direction={theme.direction}>
          {firebaseIsLoading || isLoading ? (
            <SplashScreen />
          ) : (
            <BrowserRouter>
              <Layout>
                <Grid container style={{}}>
                  <Grid item md={0} sm={0} xs={0.5}></Grid>
                  <Grid item md={12} sm={12} xs={11}>
                    <Routes>
                      {/* not found handling */}
                      {/* <Route path="/404" element={<NotFoundPage />} />
                      <Route
                        path="*"
                        element={<Navigate to="/404" replace />}
                      /> */}

                      {/* review full review */}
                      <Route
                        path={ROUTES_NAMES.EXACT_PHONE_REVIEW}
                        element={<PhoneReviewFullScreen />}
                      />
                      <Route
                        path={ROUTES_NAMES.EXACT_COMPANY_REVIEW}
                        element={<CompanyReviewFullScreen />}
                      />

                      {/* question full screen */}
                      <Route
                        path={ROUTES_NAMES.EXACT_PHONE_QUESTION}
                        element={<PhoneQuestionFullScreen />}
                      />
                      <Route
                        path={ROUTES_NAMES.EXACT_COMPANY_QUESTION}
                        element={<CompanyQuestionFullScreen />}
                      />

                      <Route path={ROUTES_NAMES.HOME}>
                        <Route
                          path="/"
                          element={
                            <Fragment>
                              <Reviews />
                              <Outlet />
                            </Fragment>
                          }
                        >
                          {!isMobile && (
                            <Route
                              path="/add-review"
                              element={<PostingModal linkShow={true} />}
                            />
                          )}
                        </Route>
                        <Route
                          path={ROUTES_NAMES.ADD_REVIEW}
                          element={<ReviewPostingScreen />}
                        />
                        <Route path={ROUTES_NAMES.MENU}>
                          <Route index element={<Menu />} />
                        </Route>
                        <Route
                          path={ROUTES_NAMES.ABOUT_US}
                          element={<AboutUsScreen />}
                        />
                        <Route
                          path={ROUTES_NAMES.PRIVACY_POLICY + "/ar"}
                          element={<PrivacyPolicyScreen />}
                        ></Route>
                        <Route
                          path={ROUTES_NAMES.PRIVACY_POLICY + "/en"}
                          element={<PrivacyPolicyScreen />}
                        ></Route>
                        <Route
                          path={ROUTES_NAMES.TERMS_AND_CONDITIONS + "/ar"}
                          element={<TermsAndConditionsScreen />}
                        />
                        <Route
                          path={ROUTES_NAMES.TERMS_AND_CONDITIONS + "/en"}
                          element={<TermsAndConditionsScreen />}
                        />
                        <Route path={ROUTES_NAMES.ALL_PRODUCTS}>
                          <Route index element={<AllProductsScreen />} />
                        </Route>
                        <Route
                          path={ROUTES_NAMES.SEARCH}
                          element={<SearchScreen />}
                        />
                        <Route
                          path={ROUTES_NAMES.LEADERBOARD}
                          element={<Leaderboard />}
                        />
                        <Route
                          path={ROUTES_NAMES.SETTINGS}
                          element={<SettingsScreen />}
                        />
                        {/* {storeUser.isAdmin && ( */}
                        <Route path={ROUTES_NAMES.ADMIN_PANEL}>
                          <Route index element={<AdminPanel />} />
                          <Route path={ROUTES_NAMES.UPDATE}>
                            <Route index element={<UpdateProducts />} />
                          </Route>
                        </Route>
                        {/* )} */}
                        {/* profile */}
                        {!isMobile ? (
                          <Route
                            path={ROUTES_NAMES.USER_PROFILE}
                            element={<Profile />}
                          >
                            <Route index element={<PostedReviews />} />
                            <Route
                              path={ROUTES_NAMES.OWNED_PHONES}
                              element={<OwnedPhonesPage />}
                            />
                            <Route
                              path={ROUTES_NAMES.REVIEWS}
                              element={<PostedReviews />}
                            />
                            <Route
                              path={ROUTES_NAMES.QUESTIONS}
                              element={<PostedQuestions />}
                            />
                            <Route
                              path={ROUTES_NAMES.MY_QUESTIONS}
                              element={<MyPhonesQuestions />}
                            />
                          </Route>
                        ) : (
                          <Route path={ROUTES_NAMES.USER_PROFILE}>
                            <Route index element={<Profile />} />
                            <Route
                              path={ROUTES_NAMES.OWNED_PHONES}
                              element={<OwnedPhonesPage />}
                            />
                            <Route
                              path={ROUTES_NAMES.REVIEWS}
                              element={<PostedReviews />}
                            />
                            <Route
                              path={ROUTES_NAMES.QUESTIONS}
                              element={<PostedQuestions />}
                            />
                            <Route
                              path={ROUTES_NAMES.MY_QUESTIONS}
                              element={<MyPhonesQuestions />}
                            />
                          </Route>
                        )}
                        {/* company profile */}
                        <Route
                          path={`${ROUTES_NAMES.COMPANY_PROFILE}`}
                          element={<CompanyProfile />}
                        >
                          <Route
                            path={ROUTES_NAMES.REVIEWS}
                            element={<CompanyReviews />}
                          />
                          <Route
                            path={ROUTES_NAMES.QUESTIONS}
                            element={<CompanyQuestions />}
                          />
                        </Route>
                        {/* phone profile */}
                        <Route
                          path={ROUTES_NAMES.PHONE_PROFILE}
                          element={<ProductProfile />}
                        >
                          <Route
                            path={ROUTES_NAMES.REVIEWS}
                            element={<ProductReviews />}
                          />
                          <Route path={ROUTES_NAMES.SPECS}>
                            <Route index element={<ProductSpecsScreen />} />
                          </Route>
                          <Route
                            path={ROUTES_NAMES.QUESTIONS}
                            element={<ProductQuestions />}
                          />
                        </Route>
                        {/* comparison screen */}
                        <Route
                          path={ROUTES_NAMES.COMPARISON}
                          element={<ComparisonScreen />}
                        />
                      </Route>

                      {/* testing routes */}
                      <Route path="/test" element={<AddReview />} />
                      <Route
                        path="/Components-test"
                        element={<ComponentsTest />}
                      />
                    </Routes>
                  </Grid>
                  <Grid item md={0} sm={0} xs={0.5}></Grid>
                </Grid>
              </Layout>
            </BrowserRouter>
          )}
        </RTL>
      </div>
    </ThemeProvider>
  );
}

export default App;
