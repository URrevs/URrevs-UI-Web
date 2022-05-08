import { Star } from "@mui/icons-material";
import { FacebookButton } from "../Components/Authentication/FacebookButton";
import { GoogleButton } from "../Components/Authentication/GoogleButton";
import { CompetitionBanner } from "../Components/CompetitionBanner/CompetitionBanner";
import { Answer } from "../Components/Interactions/Answer";
import { Comment } from "../Components/Interactions/Comment";
import { CommentReply } from "../Components/Interactions/CommentReply";
import LeaderboardEntry from "../Components/Leaderboard/LeaderboardEntry";
import ProductList from "../Components/ProductList/ProductList";
import CompanyReview from "../Components/ReviewCard/CompanyReview";
import QuestionCard from "../Components/ReviewCard/QuestionCard";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import ProductDetailsTable from "../Components/ProductDetailsTable";
import { StarCounter } from "../Components/StarCounter/StarCounter";
import { CompetitionPrompt } from "../Components/CompetitionPrompt/CompetitionPrompt";

import { useSelector } from "react-redux";
import { CompanyHorizontalList } from "../Components/CompanyHorizontalList/CompanyHorizontalList";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import styled from "@emotion/styled";
import { ProductRateCard } from "../Components/OverviewCard/ProductRateCard";
import { ProductOverviewCard } from "../Components/OverviewCard/ProductOverviewCard";
import { useAppSelector } from "../store/hooks";
import { convertDateToString } from "../functions/convertDateToString";
import { substituteDate } from "../functions/substituteDate";
import { MyAppBar } from "../Components/MainLayout/AppBar/AppBar";
import { AppBarActions } from "../Components/MainLayout/AppBar/AppBarActions";
import { Box } from "@mui/system";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { CompanyOverviewCard } from "../Components/OverviewCard/CompanyOverviewCard";
import BottomTabBar from "../Components/MainLayout/AppBar/BottomTabBar";
import { DialogTemplate } from "../Components/Dialogs/DialogTemplate";
import { InvitationDialog } from "../Components/Dialogs/InvitationDialog";
import { DialogText } from "../Components/Dialogs/DialogText";
import { PrizeDialog } from "../Components/Dialogs/PrizeDialog";
import { CompareDialog } from "../Components/Dialogs/CompareDialog/CompareDialog";
import LoadingReviewSkeleton from "../Components/Loaders/LoadingReviewSkeleton";
import { SignoutDialog } from "../Components/Dialogs/SignoutDialog";
import { Tabbar } from "../Components/Tabbar/Tabbar";
import { FilterTabbar } from "../Components/Tabbar/FilterTabbar";
import React from "react";
import { HowToWinDialog } from "../Components/Dialogs/HowToWinDialog";
import CompanyList from "../Components/ProductList/CompanyList";
import { HorizontalPhoneList } from "../Components/HorizontalPhoneList/HorizontalPhoneList";
import StarRating from "../Components/Form/StarRating";
import { StyledSnackbar } from "../Components/Snackbar/StyledSnackbar";
const testComments = {
  a1: {
    likes: 20000000,
    user: "Fady Ahmed",
    text: "يعم أحلى ريفيو.",
  },
  a2: {
    likes: 20000000,
    user: "Sweet Trips",
    text: `Doo-doo-doo-doo-doo-doo-doo-doo-doo
    Doo-doo-doo-doo-doo, la-la-laa
    Doo-doo-doo-doo-doo-doo-doo-doo-doo
    Doo-doo-doo-doo-doo, la-la-laa
    Doo-doo-doo-doo-doo-doo-doo-doo-doo
    Doo-doo-doo-doo-doo, la-la-laa-laa
    Doo-doo-doo-doo-doo-doo-doo-doo-doo
    Doo-doo-doo-doo-doo, la-la-laa`,
  },
  a3: {
    likes: 20000000,
    user: "زياد المقمر",
    text: "شكرا يا محترم.",
  },
};

const xiaomiImg =
  "https://m.media-amazon.com/images/I/41o9nGF3rPL._AC_SY580_.jpg";

const ComponentsTest = (props) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const language = useAppSelector((state) => state.language.language);
  const [value, setValue] = React.useState(0);
  const date1 = convertDateToString(new Date(2020, 1, 1), language);
  const date2 = substituteDate(new Date(2022, 3, 29), language);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  let url = "sada";
  return (
    <React.Fragment>
      <br />
      {/* <HowToWinDialog /> */}
      <br />
      <ProductList></ProductList>
      <br />
      <CompanyList />
      <br />
      <FilterTabbar />
      <br />
      <br />
      <Button onClick={handleOpen}>Open Snackbar</Button>
      <StyledSnackbar
        open={open}
        text="asdasdasd"
        btnText="asdasdasd"
        handleClose={handleClose}
      ></StyledSnackbar>
      <br />
      <Tabbar
        arrayOfTabs={[
          textContainer.tabBarReviews,
          textContainer.tabBarSpecs,
          textContainer.tabBarQuestionsAndAnswers,
        ]}
      />
      <br />
      <StarRating
        starValue={value}
        onRatingChange={(rating) => {
          setValue(rating);
        }}
      />
      <br />
      <Tabbar
        arrayOfTabs={[
          textContainer.tabBarReviews,
          textContainer.tabBarQuestionsAndAnswers,
        ]}
      />
      <br />
      <div style={{ margin: "12px" }}>
        {/* <SignoutDialog /> */}

        <br />
        <LoadingReviewSkeleton />
        <br />
        {/* <CompareDialog item="Nokia 7 Plus" />
        <br />
        <PrizeDialog prize="Xiaomi Mi Band 5" prizeImgSrc={xiaomiImg} />
        <br />
        <DialogText text="كلما كانت مراجعتك مميزة ومليئة بالتفاصيل سوف تحصل علي نقاط مساعدة أكبر." /> */}
        <br />
        {/* <InvitationDialog /> */}
        {/* <br /> */}
        {/* <HorizontalPhoneList /> */}
        {/* <br /> */}
        <CompanyOverviewCard
          viewer="100"
          companyName="Nokia"
          type="شركة"
          companyRating={3}
        />
        {/* <br /> */}
        {/* <ProductOverviewCard
          ratings={[1, 2, 3, 4, 5]}
          productRating={3}
          companyRating={3}
          viewer="100"
          phone="Nokia 7 Plus"
          type="هاتف ذكي"
        /> */}
        {/* <br /> */}
        {/* <ProductRateCard
      productRating="3"
      companyRating="3"
      viewer="100"
      phone="Nokia 7 Plus"
      type="هاتف ذكي"
    /> */}
        {/* <br /> */}
        {/* 2 16 18 20 27 */}
        <CustomAppBar showLogo={true} showProfile={true} showSearch={true} />
        {/* 3 17 */}
        {/* <CustomAppBar showProfile={true} showSearch={true} showBackBtn={true} /> */}
        {/*  4 28 5 6 7 8 9 11 21 22 23 24 25 26 29 */}
        {/* <CustomAppBar showLabel={true} label="حسابي" showBackBtn={true} /> */}
        {/* <CustomAppBar
        left={true}
        englishName={true}
        showLabel={true}
        showSearch={true}
        showProfile={true}
        label="Nokia 7 plus"
        showBackBtn={true}
      /> */}
        {/* <BottomTabBar /> */}
        {/* <CustomAppBar
        englishName={true}
        showProfile={true}
        showSearch={true}
        revert={true}
        showLabel={true}
        label="Nokia"
        showBackBtn={true}
        showTabBar={true}
      /> */}
        {/* <BottomTabBar /> */}
        {/* <CustomAppBar
        showLabel={true}
        label="الاسئلة المطروحة"
        showBackBtn={true}
        showTabBar={true}
      />
      <BottomTabBar /> */}
        {/* <br />
        <img width="100%" height="auto" src="./images/full_logo.png" />
        <br /> */}
        <GoogleButton />
        <br />
        <FacebookButton />
        <br />
        <StarCounter value={85}></StarCounter>
        <br />
        <CompanyHorizontalList></CompanyHorizontalList>
        <br />
        {/* <CompetitionPrompt button="أضف المسابقة" imgSrc={xiaomiImg} />
        <br />
        <CompetitionBanner
          daysLeft="12"
          prize="Xiaomi Mi Band 5"
        ></CompetitionBanner> */}
        <br />
        <ProductList title={`المنتجات المضافة حديثا (20)`}></ProductList>
        <br />
        <ProductList
          title={`${textContainer.menuOfRecentlyAddedCompanies} (0)`}
        ></ProductList>
        <br />
        {/* <StarCounter value={20}></StarCounter>
      <br /> */}
        <Comment
          date={date2}
          likes={testComments.a2.likes}
          text={testComments.a2.text}
          user="Fady Ahmed"
        ></Comment>
        <br />
        <CommentReply
          date={date2}
          likes={testComments.a3.likes}
          text={testComments.a3.text}
          user={testComments.a3.user}
        ></CommentReply>
        <br />
        <Answer
          date={date2}
          subtitle="امتلك هذا المنتج لمدة 3 أشهر"
          likes={testComments.a3.likes}
          text={testComments.a3.text}
          user={testComments.a3.user}
        ></Answer>
        <br />
        <Answer
          date={date2}
          subtitle="امتلك هذا المنتج لمدة 3 أشهر"
          likes={testComments.a3.likes}
          text={testComments.a3.text}
          user={testComments.a3.user}
          admin={true}
        ></Answer>
        <br />
        <Comment
          date={date2}
          likes="20000"
          text="يعم أحلى ريفيو."
          user="Fady Ahmed"
        ></Comment>
        <br />
        {/* <CompanyReview
          isReview={true}
          reviewDetails={{
            _id: "Review1",
            user_name: "Fady Ahmed",
            brand: "Oppo",
            rating: 1,
            pros: "asd sad kjasdn askd lasmldk as saopdj slajd las",
            cons: "aslk dnksan dksand klasdn a",
            ratings: {},
            approved: true,
            brand_rating: 1,
            brand_pros: "sa dnsajkdn jkasnd naskndk asnkj",
            brand_cons: "ask kdnsajkd asnd kasnjk dnasknd sj",
            date_rev: date1,
            isExpanded: false,
            user_avatar: "",
          }}
          index={0}
          clearIndexCache={() => {}}
          isPhoneReview={false}
        />
        <br />
        <ReviewCard
          firstStarTitle={textContainer.generalProductRating}
          isReview={true}
          reviewDetails={{
            _id: "Review1",
            user_name: "Fady Ahmed",
            brand: "Oppo",
            product: "Reno 5",
            rating: 1,
            pros: "asd sad kjasdn askd lasmldk as saopdj slajd las",
            cons: "aslk dnksan dksand klasdn a",
            ratings: {},
            approved: true,
            brand_rating: 1,
            brand_pros: "sa dnsajkdn jkasnd naskndk asnkj",
            brand_cons: "ask kdnsajkd asnd kasnjk dnasknd sj",
            date_buy: date2,
            date_rev: date1,
            isExpanded: false,
            user_avatar: "",
          }}
          index={0}
          clearIndexCache={() => {}}
          isPhoneReview={true}
        />
        <br />
        <QuestionCard
          reviewDetails={{
            _id: "Review1",
            user_name: "Fady Ahmed",
            brand: "Oppo",
            product: "Reno 5",
            rating: 1,
            pros: "asd sad kjasdn askd lasmldk as saopdj slajd las",
            cons: "aslk dnksan dksand klasdn a",
            ratings: {},
            approved: true,
            brand_rating: 1,
            brand_pros: "sa dnsajkdn jkasnd naskndk asnkj",
            brand_cons: "ask kdnsajkd asnd kasnjk dnasknd sj",
            date_rev: date1,
            isExpanded: false,
            user_avatar: "",
          }}
          index={0}
          clearIndexCache={() => {}}
        /> */}
        {/* <ProductDetailsTable /> */}
        {/* <ProductDetailsTable isComparison={true} /> */}
        <br />

        <LeaderboardEntry />
        <br />
      </div>
    </React.Fragment>
  );
};

export default ComponentsTest;
