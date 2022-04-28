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
import { Container } from "@mui/material";
import styled from "@emotion/styled";
import { ProductRateCard } from "../Components/ProductRateCard/ProductRateCard";
import { useAppSelector } from "../store/hooks";

const testComments = {
  a1: {
    likes: 200,
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
    likes: 1,
    user: "زياد المقمر",
    text: "شكرا يا محترم.",
  },
};

const xiaomiImg =
  "https://m.media-amazon.com/images/I/41o9nGF3rPL._AC_SY580_.jpg";

const ComponentsTest = (props) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  return (
    <div style={{ margin: "12px" }}>
      <ProductRateCard
        viewer="100"
        phone="Nokia 7 Plus"
        type="هاتف ذكي"
      ></ProductRateCard>
      <br />
      <br />

      <CompanyHorizontalList></CompanyHorizontalList>

      <br />
      <CompetitionPrompt button="أضف المسابقة" imgSrc={xiaomiImg} />
      <br />
      <CompetitionBanner
        daysLeft="12"
        prize="Xiaomi Mi Band 5"
      ></CompetitionBanner>
      <br />
      <ProductList
        title={`${textContainer.menuOfRecentlyAddedProducts} (20)`}
      ></ProductList>
      <br />
      <ProductList
        title={`${textContainer.menuOfRecentlyAddedCompanies} (0)`}
      ></ProductList>
      <br />

      {/* <StarCounter value={20}></StarCounter>
      <br /> */}

      <Comment
        date="8 ساعات"
        likes={testComments.a2.likes}
        text={testComments.a2.text}
        user="Fady Ahmed"
      ></Comment>
      <br />

      <CommentReply
        date="يوم"
        likes={testComments.a3.likes}
        text={testComments.a3.text}
        user={testComments.a3.user}
      ></CommentReply>
      <br />
      <Answer
        date="شهر"
        subtitle="امتلك هذا المنتج لمدة 3 أشهر"
        likes={testComments.a3.likes}
        text={testComments.a3.text}
        user={testComments.a3.user}
      ></Answer>
      <br />
      <Answer
        date="شهر"
        subtitle="امتلك هذا المنتج لمدة 3 أشهر"
        likes={testComments.a3.likes}
        text={testComments.a3.text}
        user={testComments.a3.user}
        admin={true}
      ></Answer>
      <br />
      <Comment
        date="4 ساعات"
        likes="20000"
        text="يعم أحلى ريفيو."
        user="Fady Ahmed"
      ></Comment>
      <br />
      <CompanyReview
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
          date_rev: "2018/2/2",
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
          date_buy: "شهر",
          date_rev: "22/8/2022",
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
          date_rev: "2022/8/2",
          isExpanded: false,
          user_avatar: "",
        }}
        index={0}
        clearIndexCache={() => {}}
      />
      <br />
      <ProductDetailsTable />
      <br />
      <ProductDetailsTable isComparison={true} />
      <br />
      <br />
      <br />
      <br />
      <GoogleButton />
      <br />
      <FacebookButton />
      <br />
      <LeaderboardEntry />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default ComponentsTest;
