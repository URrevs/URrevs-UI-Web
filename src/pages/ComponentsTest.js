import React from "react";
import { Footer } from "../Components/Banners/Footer";
import Banner from "../Components/Banners/Banner";
import { ProfileTabbar } from "../Components/Tabbar/Desktop/ProfileTabbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { Card } from "@mui/material";
import { StickyTabbar } from "../Components/Tabbar/Desktop/StickyTabbar";
import { QuestionsTab } from "./PostingScreen/QuestionsTab";
import { CompetitionPrompt } from "../Components/CompetitionPrompt/CompetitionPrompt";
import { PostingComponent } from "../Components/PostingComponents/PostingComponent";
import { PostingModal } from "../Components/PostingComponents/PostingModal";
import { PostingField } from "../Components/PostingComponents/PostingField";
import { Comment } from "../Components/Interactions/Comment";
import { CommentReply } from "../Components/Interactions/CommentReply";
import { postingModalActions } from "../store/uiPostingModalSlice";

export const ComponentsTest = () => {
  /* Footer */
  const renderFooter = () => <Footer />;
  /* Banner */
  const renderBanner = () => <Banner />;
  /* Personal Tabbar*/
  const currentUserProfile = useAppSelector((state) => state.auth);
  const [value, setValue] = React.useState(0);
  const renderProfileTabbar = () => (
    <ProfileTabbar
      userProfile={currentUserProfile}
      arrayOfTabs={["المراجعات", "الاسئلة المطروحة", "المنتجات الممتكلة"]}
      value={value}
      setValue={setValue}
    >
      <div>
        <h2>Sticky Element: Scroll Down to See the Effect</h2>
        <p>Scroll down this page to see how sticky positioning works.</p>

        <p>Some example text..</p>
        <h2>Scroll back up again to "remove" the sticky position.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
          scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices
          nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut
          aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in
          odio. Praesent convallis urna a lacus interdum ut hendrerit risus
          congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac.
          In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec
          vitae dui eget tellus gravida venenatis. Integer fringilla congue eros
          non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo
          purus. Mauris quis diam velit. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi
          lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.
          Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce
          luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed
          ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum
          ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper
          ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
          ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer
          fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
          porta. Cras ac leo purus. Mauris quis diam velit. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et
          dictum interdum, nisi lorem egestas odio, vitae scelerisque enim
          ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget,
          auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris
          ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
          convallis urna a lacus interdum ut hendrerit risus congue. Nunc
          sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
          sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget
          tellus gravida venenatis. Integer fringilla congue eros non fermentum.
          Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis
          diam velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas
          odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl
          est, ultrices nec congue eget, auctor vitae massa. Fusce luctus
          vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare
          eu, lobortis in odio. Praesent convallis urna a lacus interdum ut
          hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper
          ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
          ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer
          fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
          porta. Cras ac leo purus. Mauris quis diam velit. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et
          dictum interdum, nisi lorem egestas odio, vitae scelerisque enim
          ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget,
          auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris
          ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
          convallis urna a lacus interdum ut hendrerit risus congue. Nunc
          sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
          sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget
          tellus gravida venenatis. Integer fringilla congue eros non fermentum.
          Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis
          diam velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas
          odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl
          est, ultrices nec congue eget, auctor vitae massa. Fusce luctus
          vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare
          eu, lobortis in odio. Praesent convallis urna a lacus interdum ut
          hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper
          ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
          ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer
          fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
          porta. Cras ac leo purus. Mauris quis diam velit. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et
          dictum interdum, nisi lorem egestas odio, vitae scelerisque enim
          ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget,
          auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris
          ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
          convallis urna a lacus interdum ut hendrerit risus congue. Nunc
          sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
          sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget
          tellus gravida venenatis. Integer fringilla congue eros non fermentum.
          Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis
          diam velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas
          odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl
          est, ultrices nec congue eget, auctor vitae massa. Fusce luctus
          vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare
          eu, lobortis in odio. Praesent convallis urna a lacus interdum ut
          hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper
          ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
          ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer
          fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
          porta. Cras ac leo purus. Mauris quis diam velit. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et
          dictum interdum, nisi lorem egestas odio, vitae scelerisque enim
          ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget,
          auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris
          ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
          convallis urna a lacus interdum ut hendrerit risus congue. Nunc
          sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
          sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget
          tellus gravida venenatis. Integer fringilla congue eros non fermentum.
          Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis
          diam velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas
          odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl
          est, ultrices nec congue eget, auctor vitae massa. Fusce luctus
          vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare
          eu, lobortis in odio. Praesent convallis urna a lacus interdum ut
          hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper
          ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
          ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer
          fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
          porta. Cras ac leo purus. Mauris quis diam velit. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et
          dictum interdum, nisi lorem egestas odio, vitae scelerisque enim
          ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget,
          auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris
          ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
          convallis urna a lacus interdum ut hendrerit risus congue. Nunc
          sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
          sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget
          tellus gravida venenatis. Integer fringilla congue eros non fermentum.
          Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis
          diam velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas
          odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl
          est, ultrices nec congue eget, auctor vitae massa. Fusce luctus
          vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare
          eu, lobortis in odio. Praesent convallis urna a lacus interdum ut
          hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper
          ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
          ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer
          fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
          porta. Cras ac leo purus. Mauris quis diam velit. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et
          dictum interdum, nisi lorem egestas odio, vitae scelerisque enim
          ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget,
          auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris
          ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
          convallis urna a lacus interdum ut hendrerit risus congue. Nunc
          sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
          sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget
          tellus gravida venenatis. Integer fringilla congue eros non fermentum.
          Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis
          diam velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas
          odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl
          est, ultrices nec congue eget, auctor vitae massa. Fusce luctus
          vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare
          eu, lobortis in odio. Praesent convallis urna a lacus interdum ut
          hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper
          ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
          ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer
          fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
          porta. Cras ac leo purus. Mauris quis diam velit.Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et
          dictum interdum, nisi lorem egestas odio, vitae scelerisque enim
          ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget,
          auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris
          ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
          convallis urna a lacus interdum ut hendrerit risus congue. Nunc
          sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
          sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget
          tellus gravida venenatis. Integer fringilla congue eros non fermentum.
          Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis
          diam velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas
          odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl
          est, ultrices nec congue eget, auctor vitae massa. Fusce luctus
          vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare
          eu, lobortis in odio. Praesent convallis urna a lacus interdum ut
          hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper
          ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
          ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer
          fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
          porta. Cras ac leo purus. Mauris quis diam velit. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et
          dictum interdum, nisi lorem egestas odio, vitae scelerisque enim
          ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget,
          auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris
          ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
          convallis urna a lacus interdum ut hendrerit risus congue. Nunc
          sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
          sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget
          tellus gravida venenatis. Integer fringilla congue eros non fermentum.
          Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis
          diam velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas
          odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl
          est, ultrices nec congue eget, auctor vitae massa. Fusce luctus
          vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare
          eu, lobortis in odio. Praesent convallis urna a lacus interdum ut
          hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper
          ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
          ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer
          fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
          porta. Cras ac leo purus. Mauris quis diam velit. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et
          dictum interdum, nisi lorem egestas odio, vitae scelerisque enim
          ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget,
          auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris
          ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
          convallis urna a lacus interdum ut hendrerit risus congue. Nunc
          sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
          sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget
          tellus gravida venenatis. Integer fringilla congue eros non fermentum.
          Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis
          diam velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas
          odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl
          est, ultrices nec congue eget, auctor vitae massa. Fusce luctus
          vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare
          eu, lobortis in odio. Praesent convallis urna a lacus interdum ut
          hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper
          ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
          ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer
          fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
          porta. Cras ac leo purus. Mauris quis diam velit. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et
          dictum interdum, nisi lorem egestas odio, vitae scelerisque enim
          ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget,
          auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris
          ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
          convallis urna a lacus interdum ut hendrerit risus congue. Nunc
          sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
          sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget
          tellus gravida venenatis. Integer fringilla congue eros non fermentum.
          Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis
          diam velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas
          odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl
          est, ultrices nec congue eget, auctor vitae massa. Fusce luctus
          vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare
          eu, lobortis in odio. Praesent convallis urna a lacus interdum ut
          hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper
          ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
          ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer
          fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
          porta. Cras ac leo purus. Mauris quis diam velit.
        </p>
      </div>
    </ProfileTabbar>
  );
  /* Formik QuestionsTab */
  const renderQuestionsTab = () => <QuestionsTab />;

  /* CompetitionPrompt */
  const renderCompetitionPrompt = () => <CompetitionPrompt />;
  /*====PostingComponents */
  /* PostingComponent*/
  const dispatch = useAppDispatch();
  const renderPostingComponent = () => (
    <PostingComponent
      params={{
        disabled: true,
        onClick: () => {
          dispatch(
            postingModalActions.showPostingModal({
              tab: 0,
            })
          );
        },
      }}
      label="يمكنك اضافة مراجعة:"
      placeholder="اكتب مراجعتك"
    />
  );
  /*PostingModal */
  const renderPostingModal = () => <PostingModal />;
  /* PostingField*/
  const renderCommentSection = () => (
    <PostingField placeholder="اكتب تعليقاً" />
  );
  //---RETURN---
  return (
    <React.Fragment>
      <FixedGrid>
        <div style={{ height: "20px" }}> </div>
        {renderPostingComponent()}
        <div style={{ height: "20px" }}> </div>
        <Card>{renderCommentSection()}</Card>
      </FixedGrid>
    </React.Fragment>
  );
};

// import { Button } from "@mui/material";
// import React from "react";
// import { FacebookButton } from "../Components/Authentication/FacebookButton";
// import { GoogleButton } from "../Components/Authentication/GoogleButton";
// import { CompanyHorizontalList } from "../Components/CompanyHorizontalList/CompanyHorizontalList";
// import StarRating from "../Components/Form/StarRating";
// import { Answer } from "../Components/Interactions/Answer";
// import { Comment } from "../Components/Interactions/Comment";
// import { CommentReply } from "../Components/Interactions/CommentReply";
// import LeaderboardEntry from "../Components/Leaderboard/LeaderboardEntry";
// import LoadingReviewSkeleton from "../Components/Loaders/LoadingReviewSkeleton";
// import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
// import { CompanyOverviewCard } from "../Components/OverviewCard/CompanyOverviewCard";
// import CompanyList from "../Components/ProductList/CompanyList";
// import ProductList from "../Components/ProductList/ProductList";
// import { StyledSnackbar } from "../Components/Snackbar/StyledSnackbar";
// import { StarCounter } from "../Components/StarCounter/StarCounter";
// import { FilterTabbar } from "../Components/Tabbar/FilterTabbar";
// import { Tabbar } from "../Components/Tabbar/Tabbar";
// import { convertDateToString } from "../functions/convertDateToString";
// import { subtractDate } from "../functions/subtractDate";
// import { useAppSelector } from "../store/hooks";

// const testComments = {
//   a1: {
//     likes: 20000000,
//     user: "Fady Ahmed",
//     text: "يعم أحلى ريفيو.",
//   },
//   a2: {
//     likes: 20000000,
//     user: "Sweet Trips",
//     text: `Doo-doo-doo-doo-doo-doo-doo-doo-doo
//     Doo-doo-doo-doo-doo, la-la-laa
//     Doo-doo-doo-doo-doo-doo-doo-doo-doo
//     Doo-doo-doo-doo-doo, la-la-laa
//     Doo-doo-doo-doo-doo-doo-doo-doo-doo
//     Doo-doo-doo-doo-doo, la-la-laa-laa
//     Doo-doo-doo-doo-doo-doo-doo-doo-doo
//     Doo-doo-doo-doo-doo, la-la-laa`,
//   },
//   a3: {
//     likes: 20000000,
//     user: "زياد المقمر",
//     text: "شكرا يا محترم.",
//   },
// };

// const xiaomiImg =
//   "https://m.media-amazon.com/images/I/41o9nGF3rPL._AC_SY580_.jpg";

// const ComponentsTest = (props) => {
//   const textContainer = useAppSelector((state) => state.language.textContainer);
//   const language = useAppSelector((state) => state.language.language);
//   const [value, setValue] = React.useState(0);
//   const date1 = convertDateToString(new Date(2020, 1, 1), language);
//   const date2 = subtractDate(new Date(2022, 3, 29), language);
//   const [open, setOpen] = React.useState(false);
//   const handleClose = () => setOpen(false);
//   const handleOpen = () => setOpen(true);

//   let url = "sada";
//   return (
//     <React.Fragment>
//       <br />
//       {/* <HowToWinDialog /> */}
//       <br />
//       <ProductList></ProductList>
//       <br />
//       <CompanyList />
//       <br />
//       <FilterTabbar />
//       <br />
//       <br />
//       <Button onClick={handleOpen}>Open Snackbar</Button>
//       <StyledSnackbar
//         open={open}
//         text="asdasdasd"
//         btnText="asdasdasd"
//         handleClose={handleClose}
//       ></StyledSnackbar>
//       <br />
//       <Tabbar
//         arrayOfTabs={[
//           textContainer.tabBarReviews,
//           textContainer.tabBarSpecs,
//           textContainer.tabBarQuestionsAndAnswers,
//         ]}
//       />
//       <br />
//       <StarRating
//         starValue={value}
//         onRatingChange={(rating) => {
//           setValue(rating);
//         }}
//       />
//       <br />
//       <Tabbar
//         arrayOfTabs={[
//           textContainer.tabBarReviews,
//           textContainer.tabBarQuestionsAndAnswers,
//         ]}
//       />
//       <br />
//       <div style={{ margin: "12px" }}>
//         {/* <SignoutDialog /> */}

//         <br />
//         <LoadingReviewSkeleton />
//         <br />
//         {/* <CompareDialog item="Nokia 7 Plus" />
//         <br />
//         <PrizeDialog prize="Xiaomi Mi Band 5" prizeImgSrc={xiaomiImg} />
//         <br />
//         <DialogText text="كلما كانت مراجعتك مميزة ومليئة بالتفاصيل سوف تحصل علي نقاط مساعدة أكبر." /> */}
//         <br />
//         {/* <InvitationDialog /> */}
//         {/* <br /> */}
//         {/* <HorizontalPhoneList /> */}
//         {/* <br /> */}
//         <CompanyOverviewCard
//           viewer="100"
//           companyName="Nokia"
//           type="شركة"
//           companyRating={3}
//         />
//         {/* <br /> */}
//         {/* <ProductOverviewCard
//           ratings={[1, 2, 3, 4, 5]}
//           productRating={3}
//           companyRating={3}
//           viewer="100"
//           phone="Nokia 7 Plus"
//           type="هاتف ذكي"
//         /> */}
//         {/* <br /> */}
//         {/* <ProductRateCard
//       productRating="3"
//       companyRating="3"
//       viewer="100"
//       phone="Nokia 7 Plus"
//       type="هاتف ذكي"
//     /> */}
//         {/* <br /> */}
//         {/* 2 16 18 20 27 */}
//         <CustomAppBar showLogo={true} showProfile={true} showSearch={true} />
//         {/* 3 17 */}
//         {/* <CustomAppBar showProfile={true} showSearch={true} showBackBtn={true} /> */}
//         {/*  4 28 5 6 7 8 9 11 21 22 23 24 25 26 29 */}
//         {/* <CustomAppBar showLabel={true} label="حسابي" showBackBtn={true} /> */}
//         {/* <CustomAppBar
//         left={true}
//         englishName={true}
//         showLabel={true}
//         showSearch={true}
//         showProfile={true}
//         label="Nokia 7 plus"
//         showBackBtn={true}
//       /> */}
//         {/* <BottomTabBar /> */}
//         {/* <CustomAppBar
//         englishName={true}
//         showProfile={true}
//         showSearch={true}
//         revert={true}
//         showLabel={true}
//         label="Nokia"
//         showBackBtn={true}
//         showTabBar={true}
//       /> */}
//         {/* <BottomTabBar /> */}
//         {/* <CustomAppBar
//         showLabel={true}
//         label="الاسئلة المطروحة"
//         showBackBtn={true}
//         showTabBar={true}
//       />
//       <BottomTabBar /> */}
//         {/* <br />
//         <img width="100%" height="auto" src="./images/full_logo.png" />
//         <br /> */}
//         <GoogleButton />
//         <br />
//         <FacebookButton />
//         <br />
//         <StarCounter value={85}></StarCounter>
//         <br />
//         <CompanyHorizontalList></CompanyHorizontalList>
//         <br />
//         {/* <CompetitionPrompt button="أضف المسابقة" imgSrc={xiaomiImg} />
//         <br />
//         <CompetitionBanner
//           daysLeft="12"
//           prize="Xiaomi Mi Band 5"
//         ></CompetitionBanner> */}
//         <br />
//         <ProductList title={`المنتجات المضافة حديثا (20)`}></ProductList>
//         <br />
//         <ProductList
//           title={`${textContainer.menuOfRecentlyAddedCompanies} (0)`}
//         ></ProductList>
//         <br />
//         {/* <StarCounter value={20}></StarCounter>
//       <br /> */}
//         <Comment
//           date={date2}
//           likes={testComments.a2.likes}
//           text={testComments.a2.text}
//           user="Fady Ahmed"
//         ></Comment>
//         <br />
//         <CommentReply
//           date={date2}
//           likes={testComments.a3.likes}
//           text={testComments.a3.text}
//           user={testComments.a3.user}
//         ></CommentReply>
//         <br />
//         <Answer
//           date={date2}
//           subtitle="امتلك هذا المنتج لمدة 3 أشهر"
//           likes={testComments.a3.likes}
//           text={testComments.a3.text}
//           user={testComments.a3.user}
//         ></Answer>
//         <br />
//         <Answer
//           date={date2}
//           subtitle="امتلك هذا المنتج لمدة 3 أشهر"
//           likes={testComments.a3.likes}
//           text={testComments.a3.text}
//           user={testComments.a3.user}
//           admin={true}
//         ></Answer>
//         <br />
//         <Comment
//           date={date2}
//           likes="20000"
//           text="يعم أحلى ريفيو."
//           user="Fady Ahmed"
//         ></Comment>
//         <br />
//         {/* <CompanyReview
//           isReview={true}
//           reviewDetails={{
//             _id: "Review1",
//             user_name: "Fady Ahmed",
//             brand: "Oppo",
//             rating: 1,
//             pros: "asd sad kjasdn askd lasmldk as saopdj slajd las",
//             cons: "aslk dnksan dksand klasdn a",
//             ratings: {},
//             approved: true,
//             brand_rating: 1,
//             brand_pros: "sa dnsajkdn jkasnd naskndk asnkj",
//             brand_cons: "ask kdnsajkd asnd kasnjk dnasknd sj",
//             date_rev: date1,
//             isExpanded: false,
//             user_avatar: "",
//           }}
//           index={0}
//           clearIndexCache={() => {}}
//           isPhoneReview={false}
//         />
//         <br />
//         <ReviewCard
//           firstStarTitle={textContainer.generalProductRating}
//           isReview={true}
//           reviewDetails={{
//             _id: "Review1",
//             user_name: "Fady Ahmed",
//             brand: "Oppo",
//             product: "Reno 5",
//             rating: 1,
//             pros: "asd sad kjasdn askd lasmldk as saopdj slajd las",
//             cons: "aslk dnksan dksand klasdn a",
//             ratings: {},
//             approved: true,
//             brand_rating: 1,
//             brand_pros: "sa dnsajkdn jkasnd naskndk asnkj",
//             brand_cons: "ask kdnsajkd asnd kasnjk dnasknd sj",
//             date_buy: date2,
//             date_rev: date1,
//             isExpanded: false,
//             user_avatar: "",
//           }}
//           index={0}
//           clearIndexCache={() => {}}
//           isPhoneReview={true}
//         />
//         <br />
//         <QuestionCard
//           reviewDetails={{
//             _id: "Review1",
//             user_name: "Fady Ahmed",
//             brand: "Oppo",
//             product: "Reno 5",
//             rating: 1,
//             pros: "asd sad kjasdn askd lasmldk as saopdj slajd las",
//             cons: "aslk dnksan dksand klasdn a",
//             ratings: {},
//             approved: true,
//             brand_rating: 1,
//             brand_pros: "sa dnsajkdn jkasnd naskndk asnkj",
//             brand_cons: "ask kdnsajkd asnd kasnjk dnasknd sj",
//             date_rev: date1,
//             isExpanded: false,
//             user_avatar: "",
//           }}
//           index={0}
//           clearIndexCache={() => {}}
//         /> */}
//         {/* <ProductDetailsTable /> */}
//         {/* <ProductDetailsTable isComparison={true} /> */}
//         <br />

//         <LeaderboardEntry />
//         <br />
//       </div>
//     </React.Fragment>
//   );
// };

// export default ComponentsTest;
