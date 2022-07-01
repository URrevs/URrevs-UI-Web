import { useTheme } from "@emotion/react";
import { Fragment } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { AlonePostsGrid } from "../Components/Grid/AlonePostsGrid";
import { ProfileTabbar } from "../Components/Tabbar/Desktop/ProfileTabbar";
import ROUTES_NAMES from "../RoutesNames";
import { useAppSelector } from "../store/hooks";
import CurrentUserProfilePage from "./CurrentUserProfile";
import OtherUserProfilePage from "./OtherUserProfile";

export default function Profile() {
  const isMobile = useTheme().isMobile;

  const currentUserId = useAppSelector((state) => state.auth.uid);

  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("userId");

  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionry = {
    collectedStars: textContainer.collectedStars,
    myReviews: textContainer.myReviews,
    myQuestions: textContainer.myQuestions,
    ownedProducts: textContainer.ownedProducts,
    reviews: textContainer.reviews,
    questions: textContainer.askedQuestions,
    referalCode: textContainer.yourInvitationCode,
    askedQuestions: textContainer.questionsOnMyProducts,
    inviteFriends: textContainer.inviteYourFriendsToWriteTheirReviews,
    helpOthers: textContainer.helpOthersAndGetPoints,
  };

  const listItems = [
    {
      title:
        paramId === currentUserId
          ? pageDictionry.myReviews
          : pageDictionry.reviews,
      to: `${ROUTES_NAMES.REVIEWS}?userId=${paramId}`,
    },
    {
      title:
        paramId === currentUserId
          ? pageDictionry.myQuestions
          : pageDictionry.questions,
      to: `${ROUTES_NAMES.QUESTIONS}?userId=${paramId}`,
    },
    {
      title: pageDictionry.ownedProducts,
      to: `${ROUTES_NAMES.OWNED_PHONES}?userId=${paramId}`,
    },
    {
      title: pageDictionry.referalCode,
      to: "",
    },
    {
      title: pageDictionry.askedQuestions,
      to: `${ROUTES_NAMES.MY_QUESTIONS}?userId=${paramId}`,
    },
  ];

  if (paramId === currentUserId || paramId === null) {
    return !isMobile ? (
      <Fragment>
        <ProfileTabbar
          arrayOfTabs={[listItems[0], listItems[1], listItems[2], listItems[4]]}
        ></ProfileTabbar>
        <AlonePostsGrid>
          <Outlet context={{ isCurrentUser: paramId === currentUserId }} />
        </AlonePostsGrid>
      </Fragment>
    ) : (
      <Fragment>
        <CurrentUserProfilePage />
      </Fragment>
    );
  } else {
    return !isMobile ? (
      <Fragment>
        <ProfileTabbar
          arrayOfTabs={[listItems[0], listItems[1], listItems[2]]}
        ></ProfileTabbar>
        <AlonePostsGrid>
          <Outlet context={{ isCurrentUser: paramId === currentUserId }} />
        </AlonePostsGrid>
      </Fragment>
    ) : (
      <OtherUserProfilePage uid={paramId} />
    );
  }
}
