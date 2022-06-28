import { ThemeProvider } from "@emotion/react";
import {
  alpha,
  createTheme,
  CssBaseline,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  useAuthenticateMutation,
  useGetCurrentUserProfileMutation,
} from "../src/services/users";
import "./App.css";
import Banner from "./Components/Banners/Banner";
import { Footer } from "./Components/Banners/Footer";
import Layout from "./Components/MainLayout/Layout";
import RTL from "./Components/RTL";
import { ProfileTabbar } from "./Components/Tabbar/Desktop/ProfileTabbar";
import { ProductProfile } from "./pages/10_ProductProfile";
import { ComparisonScreen } from "./pages/11_ComparisonScreen";
import { CompanyProfile } from "./pages/14_CompanyProfile";
import { AllProductsScreen } from "./pages/16_AllProductsScreen";
import CompanyQuestionFullScreen from "./pages/17_CompanyQuestionFullScreen";
import PhoneQuestionFullScreen from "./pages/17_PhoneQuestionFullScreen";
import ReviewPostingScreen from "./pages/18_ReviewPostingScreen";
import Menu from "./pages/20_Menu";
import { SettingsScreen } from "./pages/21_SettingsScreen";
import { AdminPanel } from "./pages/26_AdminPanel";
import { UpdateProducts } from "./pages/29_UpdateProducts";
import Reviews from "./pages/2_HomePageScrolling";
import CompanyReviewFullScreen from "./pages/3_CompanyReviewFullScreen";
import PhoneReviewFullScreen from "./pages/3_PhoneReviewFullScreen";
import { NotFoundPage } from "./pages/404/404";
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
import ROUTES_NAMES from "./RoutesNames";
import { authActions } from "./store/authSlice";
import { useAppDispatch } from "./store/hooks";
import { fonts } from "./Styles/fonts";
import { COLORS } from "./Styles/main_light_colors";

function App() {
  const language = useSelector((state) => state.language.language);
  const direction = language === "ar" ? "rtl" : "ltr";
  const isDark = useSelector((state) => state.darkMode.isDark);

  const isMobile = useMediaQuery(`(max-width:768px)`);

  const theme = createTheme({
    isMobile: isMobile,
    direction: `${direction}`,
    typography: fonts,
    MuiButton: {
      styleOverrides: {
        root: {
          lineHeight: 0,
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
        appBarColor: isDark ? "#242526" : COLORS.cffffff,
        appBarIconBackgroundColor: isDark ? "#E5E5E7" : COLORS.ce5e5e7,
        appBarIcon: isDark ? "#000" : COLORS.c050505,
        backButton: isDark ? COLORS.cffffff : COLORS.c050505,
      },
      reviewCard: {
        reviewCardColor: isDark ? "#18191A" : COLORS.cffffff,
        actionBtnIcon: isDark ? "#606266" : COLORS.c606266,
        actionBtnIconHighlight: isDark ? "#2196F3" : COLORS.c2196f3,
        actionBtnHover: isDark ? COLORS.c000000 : COLORS.c000000,
        actionBtnBG: isDark ? COLORS.c000000 : COLORS.c000000,
        expandIcon: isDark ? "#4ED5F6" : COLORS.c4ed5f6,
        filledStarColor: isDark ? COLORS.c2196f3 : COLORS.c2196f3,
        outlinedStarColor: isDark ? COLORS.c65676b : COLORS.c050505,
        emptyStarColor: isDark ? COLORS.c65676b : COLORS.c65676b,
        reviewArrow: isDark ? COLORS.c65676b : COLORS.c65676b,
        indicatorColor: isDark ? COLORS.c65676b : COLORS.c2196f3,
      },
      drawer: {
        drawerColor: isDark ? "#242526" : COLORS.cffffff,
        drawerIcon: isDark ? COLORS.cffffff : COLORS.c050505,
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
        backgroundColor: COLORS.cffffff,
        iconColor: COLORS.c2196f3,
        buttonActiveColor: COLORS.c2196f3,
      },
      productList: {
        backgroundColor: COLORS.cffffff,
        mobileColor: COLORS.c606266,
      },
      progressBar: {
        backgroundColor: COLORS.cffffff,
        barColor: COLORS.c2196f3,
        barBorder: COLORS.c050505,
      },
      authenticationButtons: {
        googleButtonColor: COLORS.c65676b,
        facebookButtonColor: COLORS.c2196f3,
      },
      leaderBoard: {
        entryCard: COLORS.cffffff,
        rankCircle: COLORS.cf0f2f5,
      },
      bottomNavigationBar: {
        background: isDark ? "#18191A" : COLORS.cffffff,
        selectedTap: isDark ? "#2196F3" : COLORS.c2196f3,
        unselectedTap: isDark ? "#606266" : COLORS.c606266,
      },
      textField: {
        inputFieldBackground: isDark ? "#18191A" : COLORS.cf9f9f9,
        inputFieldText: isDark ? "#18191A" : COLORS.c050505,
        postingFieldBackground: isDark ? "#18191A" : COLORS.cf0f2f5,
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
        textFieldInput: isDark ? "#18191A" : COLORS.c050505,
      },
      filterTabbar: {
        buttonBgActive: isDark ? "#FFFFFF" : COLORS.c65676b,
        buttonBg: isDark ? "#FFFFFF" : COLORS.cffffff,
        borderColor: isDark ? "#FFFFFF" : COLORS.c606266,
      },
      blackIconColor: isDark ? COLORS.cCED0D4 : COLORS.c050505,
      defaultRedBtnIconColor: isDark ? COLORS.cCED0D4 : COLORS.cffffff,
      defaultIconColor: isDark ? COLORS.cCED0D4 : COLORS.c2196f3,
      cancel: isDark ? COLORS.cCED0D4 : COLORS.c050505,
      divider: isDark ? COLORS.cCED0D4 : COLORS.cCED0D4,
      defaultPageBtn: isDark ? COLORS.cCED0D4 : COLORS.c2196f3,
      hover: isDark ? COLORS.cCED0D4 : alpha(COLORS.c65676b, 0.1),
      background: {
        default: isDark ? "#18191A" : COLORS.cf0f2f5,
      },
    },
  });

  const dispatch = useAppDispatch();
  const [getApiToken] = useAuthenticateMutation();
  const [getProfile] = useGetCurrentUserProfileMutation();

  useEffect(() => {
    const signIn = async (user) => {
      try {
        console.log("hey");
        const { token: apiToken, admin: isAdmin } = await getApiToken(
          user.accessToken
        ).unwrap();

        dispatch(
          authActions.login({
            apiToken: apiToken,
            isAdmin: isAdmin,
          })
        );

        const userProfile = await getProfile(apiToken).unwrap();
        dispatch(
          authActions.login({
            isLoggedIn: true,
            uid: userProfile.uid,
            refCode: userProfile.refCode,
            photo: userProfile.photo,
            apiToken: apiToken,
            name: userProfile.name,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            email: user.email,
            points: userProfile.points,
            isAdmin: isAdmin,
          })
        );
      } catch (e) {
        console.log(e);
      }
    };

    // this may be checked if token still valid
    // to reduce authenticate requests
    getAuth().onIdTokenChanged(async (user) => {
      console.log("eee");
      if (user) {
        await signIn(user);
        try {
        } catch (error) {
          console.log(error);
        }
      }
    });
  }, [0]);

  return (
    <ThemeProvider theme={theme}>
      <div dir={direction}>
        <CssBaseline enableColorScheme />
        <RTL direction={theme.direction}>
          <BrowserRouter>
            <Layout>
              <Grid container style={{}}>
                <Grid item md={0} sm={0} xs={0.5}></Grid>
                <Grid item md={12} sm={12} xs={11}>
                  <Routes>
                    {/* not found handling */}
                    <Route path="/404" element={<NotFoundPage />} />
                    {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}

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
                      <Route index element={<Reviews />} />
                      <Route path={ROUTES_NAMES.MENU}>
                        <Route index element={<Menu />} />
                      </Route>
                      <Route path={ROUTES_NAMES.ALL_PRODUCTS}>
                        <Route index element={<AllProductsScreen />} />
                      </Route>
                      <Route path={ROUTES_NAMES.ADMIN_PANEL}>
                        <Route index element={<AdminPanel />} />
                        <Route path={ROUTES_NAMES.UPDATE}>
                          <Route index element={<UpdateProducts />} />
                        </Route>
                      </Route>

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
                    <Route path={ROUTES_NAMES.HOME}>
                      <Route
                        path={ROUTES_NAMES.ADD_REVIEW}
                        element={<ReviewPostingScreen />}
                      />
                    </Route>
                    <Route
                      path={ROUTES_NAMES.SEARCH}
                      element={<SearchScreen />}
                    />
                    <Route
                      path={ROUTES_NAMES.LEADERBOARD}
                      element={<Leaderboard />}
                    />
                    <Route path={ROUTES_NAMES.MENU}>
                      <Route index element={<Menu />} />
                    </Route>
                    <Route
                      path={ROUTES_NAMES.SETTINGS}
                      element={<SettingsScreen />}
                    />
                    <Route path={ROUTES_NAMES.ADMIN_PANEL}>
                      <Route index element={<AdminPanel />} />
                      <Route path={ROUTES_NAMES.UPDATE}>
                        <Route index element={<UpdateProducts />} />
                      </Route>
                    </Route>

                    <Route
                      path={ROUTES_NAMES.PRODUCTS}
                      element={<AllProductsScreen />}
                    />

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
        </RTL>
      </div>
    </ThemeProvider>
  );
}

export default App;
