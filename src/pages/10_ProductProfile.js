import { useTheme } from "@emotion/react";
import React, { Fragment, useEffect } from "react";
import DocumentMeta from "react-document-meta";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { StickyTabbar } from "../Components/Tabbar/Desktop/StickyTabbar";
import { PathTabbar } from "../Components/Tabbar/PathTabbar";
import { GAevent } from "../functions/gaEvents";
import { GApageView } from "../functions/gaPageView";
import ROUTES_NAMES from "../RoutesNames";

import { useGetPhoneSpecsQuery } from "../services/phones";

export const ProductProfile = () => {
  const [searchParams] = useSearchParams();
  const paramId = searchParams.get("pid");

  const isMobile = useTheme().isMobile;

  let { isLoading, data } = useGetPhoneSpecsQuery(paramId);

  // for google analitycs
  useEffect(() => {
    if (!isLoading) {
      GAevent(
        "User interaction",
        `${data.name} profile visited`,
        `${data.name} profile visited`,
        true
      );
    }
  }, [isLoading]);

  const textContainer = useSelector((state) => state.language.textContainer);

  const pageDictionary = {
    reviews: textContainer.tabBarReviews,
    specs: textContainer.tabBarSpecs,
    QnA: textContainer.tabBarQuestionsAndAnswers,
  };

  const pageDictionry = {
    reviews: pageDictionary.reviews,
    specs: pageDictionary.specs,
    qAnda: pageDictionary.QnA,
  };

  const listOfItems = [
    {
      title: pageDictionry.reviews,
      to: `${ROUTES_NAMES.REVIEWS}?pid=${paramId}`,
    },
    {
      title: pageDictionry.specs,
      to: `${ROUTES_NAMES.SPECS}?pid=${paramId}`,
    },
    {
      title: pageDictionry.qAnda,
      to: `${ROUTES_NAMES.QUESTIONS}?pid=${paramId}`,
    },
  ];

  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DocumentMeta
          {...{
            description: `${data.name} phone specs - ${data.name} مواصفات هاتف `,
            canonical: `https://${window.location.hostname}/phone/specs?pid=${data._id}`,
            meta: {
              charset: "utf-8",
              name: {
                keywords: `specs,phone,reviews,Q&A,questions and answers,price,pros,cons,${data.name},مميزات,عيوب,سعر,اسئلة واجوبة,مراجعات,هاتف,مواصفات`,
              },
            },
          }}
        >
          <CustomAppBar
            showBackBtn
            englishName
            showLabel
            label={data.name}
            showSearch
            showProfile
            // tabBar={<PathTabbar />}
          >
            <Fragment>
              {!isMobile ? (
                <StickyTabbar
                  hasParent={false}
                  arrayOfTabs={listOfItems}
                  userName={data.name}
                />
              ) : (
                <PathTabbar arrayOfTabs={listOfItems} />
              )}
              <Outlet context={{ phoneName: data.name }} />
            </Fragment>
          </CustomAppBar>
        </DocumentMeta>
      )}
    </React.Fragment>
  );
};
