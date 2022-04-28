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

const xiaomiImg = "";

const ComponentsTest = (props) => {
  return (
    <div>
      <br />
      <br />
      {/* <ProductRateCard viewers="100"></ProductRateCard> */}
      <br />
      <br />

      <CompanyHorizontalList></CompanyHorizontalList>

      <CompetitionPrompt button="أضف المسابقة" imgSrc={xiaomiImg} />
      <br />
      <CompetitionBanner
        daysLeft="12"
        prize="Xiaomi Mi Band 5"
      ></CompetitionBanner>
      <br />
      <ProductList></ProductList>
      <br />

      <StarCounter value={20}></StarCounter>
      <br />
      <Comment
        date="منذ 8 ساعات"
        likes={testComments.a2.likes}
        text={testComments.a2.text}
        user="Fady Ahmed"
      ></Comment>
      <br />

      <CommentReply
        date="منذ يوم"
        likes={testComments.a3.likes}
        text={testComments.a3.text}
        user={testComments.a3.user}
      ></CommentReply>
      <br />
      <Answer
        date="منذ شهر"
        likes={testComments.a3.likes}
        text={testComments.a3.text}
        user={testComments.a3.user}
      ></Answer>
      <br />
      <Answer
        date="منذ شهر"
        likes={testComments.a3.likes}
        text={testComments.a3.text}
        user={testComments.a3.user}
        admin={true}
      ></Answer>
      <br />
      <Comment
        date="منذ 4 ساعات"
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
          date_rev: "22/8/2022",
          isExpanded: false,
          user_avatar: "",
        }}
        index={0}
        clearIndexCache={() => {}}
        isPhoneReview={false}
      />
      <br />
      <ReviewCard
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
          date_buy: "22/8/2020",
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
          date_buy: "22/8/2020",
          date_rev: "22/8/2022",
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
      <Star />
      <img alt="" width={48} height={48} src="./images/google.png" />
      <img alt="" width={48} height={48} src="./images/google1.png" />
      <img
        alt="svgImg"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGc+PHBhdGggZD0iTTE1Ni4yNzI3NSw3MS45NjQwOGgtNS43NzI3NXYtMC4yOTc0MmgtNjQuNXYyOC42NjY2N2g0MC41MDI0MmMtNS45MDg5MiwxNi42ODc1OCAtMjEuNzg2NjcsMjguNjY2NjcgLTQwLjUwMjQyLDI4LjY2NjY3Yy0yMy43NDY3NSwwIC00MywtMTkuMjUzMjUgLTQzLC00M2MwLC0yMy43NDY3NSAxOS4yNTMyNSwtNDMgNDMsLTQzYzEwLjk2MTQyLDAgMjAuOTMzODMsNC4xMzUxNyAyOC41MjY5MiwxMC44ODk3NWwyMC4yNzA5MiwtMjAuMjcwOTJjLTEyLjc5OTY3LC0xMS45Mjg5MiAtMjkuOTIwODMsLTE5LjI4NTUgLTQ4Ljc5NzgzLC0xOS4yODU1Yy0zOS41Nzc5MiwwIC03MS42NjY2NywzMi4wODg3NSAtNzEuNjY2NjcsNzEuNjY2NjdjMCwzOS41Nzc5MiAzMi4wODg3NSw3MS42NjY2NyA3MS42NjY2Nyw3MS42NjY2N2MzOS41Nzc5MiwwIDcxLjY2NjY3LC0zMi4wODg3NSA3MS42NjY2NywtNzEuNjY2NjdjMCwtNC44MDUyNSAtMC40OTQ1LC05LjQ5NTgzIC0xLjM5MzkyLC0xNC4wMzU5MnoiIGZpbGw9IiNmZmMxMDciPjwvcGF0aD48cGF0aCBkPSJNMjIuNTk2NSw1Mi42NDI3NWwyMy41NDYwOCwxNy4yNjgwOGM2LjM3MTE3LC0xNS43NzM4MyAyMS44MDEsLTI2LjkxMDgzIDM5Ljg1NzQyLC0yNi45MTA4M2MxMC45NjE0MiwwIDIwLjkzMzgzLDQuMTM1MTcgMjguNTI2OTIsMTAuODg5NzVsMjAuMjcwOTIsLTIwLjI3MDkyYy0xMi43OTk2NywtMTEuOTI4OTIgLTI5LjkyMDgzLC0xOS4yODU1IC00OC43OTc4MywtMTkuMjg1NWMtMjcuNTI3MTcsMCAtNTEuMzk5MzMsMTUuNTQwOTIgLTYzLjQwMzUsMzguMzA5NDJ6IiBmaWxsPSIjZmYzZDAwIj48L3BhdGg+PHBhdGggZD0iTTg2LDE1Ny42NjY2N2MxOC41MTE1LDAgMzUuMzMxNjcsLTcuMDg0MjUgNDguMDQ4OTIsLTE4LjYwNDY3bC0yMi4xODA4MywtMTguNzY5NWMtNy4xOTUzMyw1LjQ1MDI1IC0xNi4xMzkzMyw4LjcwNzUgLTI1Ljg2ODA4LDguNzA3NWMtMTguNjQwNSwwIC0zNC40NjgwOCwtMTEuODg1OTIgLTQwLjQzMDc1LC0yOC40NzMxN2wtMjMuMzcwNSwxOC4wMDYyNWMxMS44NjA4MywyMy4yMDkyNSAzNS45NDgsMzkuMTMzNTggNjMuODAxMjUsMzkuMTMzNTh6IiBmaWxsPSIjNGNhZjUwIj48L3BhdGg+PHBhdGggZD0iTTE1Ni4yNzI3NSw3MS45NjQwOGgtNS43NzI3NXYtMC4yOTc0MmgtNjQuNXYyOC42NjY2N2g0MC41MDI0MmMtMi44MzgsOC4wMTU5MiAtNy45OTQ0MiwxNC45MjgxNyAtMTQuNjQ1MDgsMTkuOTYyNzVjMC4wMDM1OCwtMC4wMDM1OCAwLjAwNzE3LC0wLjAwMzU4IDAuMDEwNzUsLTAuMDA3MTdsMjIuMTgwODMsMTguNzY5NWMtMS41Njk1LDEuNDI2MTcgMjMuNjE3NzUsLTE3LjIyNTA4IDIzLjYxNzc1LC01My4wNTg0MmMwLC00LjgwNTI1IC0wLjQ5NDUsLTkuNDk1ODMgLTEuMzkzOTIsLTE0LjAzNTkyeiIgZmlsbD0iIzE5NzZkMiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
      />
      <div>dasdna </div>
      <div>dasdna </div>
      <div>dasdna </div>
      <div>dasdna </div>
      <div>dasdna </div>
    </div>
  );
};

export default ComponentsTest;
