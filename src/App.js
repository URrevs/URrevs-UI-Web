import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Grid, useMediaQuery } from "@mui/material";
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

function App() {
  const language = useSelector((state) => state.language.language);
  const direction = language === "ar" ? "rtl" : "ltr";
  const isDark = useSelector((state) => state.darkMode.isDark);
  const isMobile = useMediaQuery("(max-width:700px)");

  const theme = createTheme({
    isMobile: isMobile,
    direction: `${direction}`,
    typography: fonts,
    palette: {
      mode: isDark ? "dark" : "light",
      modalColor: isDark ? "#18191A" : COLORS.cffffff,
      appBar: {
        appBarColor: isDark ? "#242526" : COLORS.cffffff,
        appBarIconBackgroundColor: isDark ? "#E5E5E7" : COLORS.ce5e5e7,
        appBarIcon: isDark ? "#000" : COLORS.c050505,
      },
      reviewCard: {
        reviewCardColor: isDark ? "#18191A" : COLORS.cffffff,
        actionBtnIcon: isDark ? "#606266" : COLORS.c606266,
        actionBtnIconHighlight: isDark ? "#2196F3" : COLORS.c2196f3,
        actionBtnHover: isDark ? COLORS.c000000 : COLORS.c000000,
        actionBtnBG: isDark ? COLORS.c000000 : COLORS.c000000,
        expandIcon: isDark ? "#4ED5F6" : COLORS.c4ed5f6,
        filledStarColor: isDark ? COLORS.c2196f3 : COLORS.c2196f3,
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
      commentCard: {
        backgroundColor: COLORS.cffffff,
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
      background: {
        default: isDark ? "#18191A" : COLORS.cf0f2f5,
      },
    },
  });

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
