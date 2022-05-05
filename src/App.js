import { ThemeProvider } from "@emotion/react";
import {
  alpha,
  createTheme,
  CssBaseline,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/MainLayout/Layout";
import RTL from "./Components/RTL";
import AddReview from "./pages/AddReview";
import AddReviewFormik from "./pages/AddReviewFormik";
import Reviews from "./pages/Reviews";
import { COLORS } from "./Styles/main_light_colors";
import { fonts } from "./Styles/fonts";
import ComponentsTest from "./pages/ComponentsTest";
import UserProfilePage from "./pages/UserProfile";
import OwnedPhonesPage from "./pages/OwnedPhones";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { authActions } from "./store/authSlice";
import {
  useAuthenticateMutation,
  useGetCurrentUserProfileMutation,
} from "../src/services/users";
import { getAuth } from "firebase/auth";

function App() {
  console.log("app");

  const language = useSelector((state) => state.language.language);
  const direction = language === "ar" ? "rtl" : "ltr";
  const isDark = useSelector((state) => state.darkMode.isDark);
  const isMobile = useMediaQuery("(max-width:700px)");

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
        sm: 400,
        md: 800,
        lg: 1200,
      },
    },

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
        drawerIcon: isDark ? COLORS.cffffff : COLORS.c1e1e1e,
        activePage: isDark ? "#383838" : COLORS.cdbdbdb,
        tileText: isDark ? COLORS.cffffff : COLORS.c000000,
      },
      searchBar: {
        searchBarColor: isDark ? "#3A3B3C" : COLORS.ce5e5e7,
        searchIcon: isDark ? "#B0B3B8" : COLORS.c65676B,
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
        inputFieldBackground: isDark ? "#18191A" : COLORS.cE3E3E3,
        inputFieldText: isDark ? "#18191A" : COLORS.c050505,
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
      divider: isDark ? COLORS.cCED0D4 : COLORS.cCED0D4,
      hover: isDark ? COLORS.cCED0D4 : alpha(COLORS.c65676b, 0.2),
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
      const { token: apiToken } = await getApiToken(user.accessToken).unwrap();
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
        })
      );
    };

    // this may be checked if token still valid 
    // to reduce authenticate requests
    getAuth().onIdTokenChanged((user) => {
      if (user) {
        signIn(user);
        try {
        } catch (error) {
          console.log(error);
        }
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div dir={direction}>
        <CssBaseline enableColorScheme />
        <RTL direction={theme.direction}>
          <BrowserRouter>
            <Layout>
              <Grid
                container
                style={{
                  display: theme.isMobile ? "block" : "flex",
                }}
              >
                <Grid item md={2} sm={0}></Grid>
                <Grid item md={8} sm={12}>
                  <Routes>
                    <Route path="/" element={<Reviews />} />
                    <Route path="/add-review" element={<AddReviewFormik />} />
                    <Route path="/blog" element={<div>blog</div>} />
                    <Route path="/about" element={<div>about</div>} />
                    <Route path="/test" element={<AddReview />} />
                    <Route
                      path="/Components-test"
                      element={<ComponentsTest />}
                    />
                    <Route
                      path="/user-profile"
                      element={<UserProfilePage />}
                    ></Route>
                    <Route
                      path="/user-profile/owned-phones"
                      element={<OwnedPhonesPage />}
                    />
                  </Routes>
                </Grid>
                <Grid item md={2} sm={0}></Grid>
              </Grid>
            </Layout>
          </BrowserRouter>
        </RTL>
      </div>
    </ThemeProvider>
  );
}

export default App;
