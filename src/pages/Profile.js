import React, { Fragment } from "react";
import { useAppSelector } from "../store/hooks";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import CurrentUserProfilePage from "./CurrentUserProfile";
import OtherUserProfilePage from "./OtherUserProfile";
import ROUTES_NAMES from "../RoutesNames";
import { ProfileTabbar } from "../Components/Tabbar/Desktop/ProfileTabbar";
import { useTheme } from "@emotion/react";

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
    referalCode: textContainer.yourInvitationCode,
    askedQuestions: textContainer.questionsOnMyProducts,
    inviteFriends: textContainer.inviteYourFriendsToWriteTheirReviews,
    helpOthers: textContainer.helpOthersAndGetPoints,
  };

  const listItems = [
    {
      title: pageDictionry.myReviews,
      to: `../../${ROUTES_NAMES.USER_PROFILE}/${ROUTES_NAMES.REVIEWS}?userId=${paramId}`,
    },
    {
      title: pageDictionry.myQuestions,
      to: `../../${ROUTES_NAMES.USER_PROFILE}/${ROUTES_NAMES.QUESTIONS}?userId=${paramId}`,
    },
    {
      title: pageDictionry.ownedProducts,
      to: `../../${ROUTES_NAMES.USER_PROFILE}/${ROUTES_NAMES.OWNED_PHONES}?userId=${paramId}`,
    },
    {
      title: pageDictionry.referalCode,
      to: "",
    },
    {
      title: pageDictionry.askedQuestions,
      to: `../../${ROUTES_NAMES.USER_PROFILE}/${ROUTES_NAMES.MY_QUESTIONS}?userId=${paramId}`,
    },
  ];

  if (paramId === currentUserId || paramId === null) {
    return !isMobile ? (
      <Fragment>
        <ProfileTabbar
          arrayOfTabs={[listItems[0], listItems[1], listItems[2], listItems[4]]}
        ></ProfileTabbar>
        <Outlet />
      </Fragment>
    ) : (
      <CurrentUserProfilePage />
    );
  } else {
    return !isMobile ? (
      <Fragment>
        <ProfileTabbar
          arrayOfTabs={[listItems[0], listItems[1], listItems[2]]}
        ></ProfileTabbar>
        <Outlet />
      </Fragment>
    ) : (
      <OtherUserProfilePage uid={paramId} />
    );
  }
}
