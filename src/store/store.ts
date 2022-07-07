import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { companyApi } from "../services/companies";
import { companyQuestionsApi } from "../services/company_questions";
import { companyReviewsApi } from "../services/company_reviews";
import { competetionApi } from "../services/competetion";
import { homeApi } from "../services/homePage";
import { phoneApi } from "../services/phones";
import { phoneQuestionsApi } from "../services/phone_questions";
import { phoneReviewsApi } from "../services/phone_reviews";
import { reportsApi } from "../services/reports";
import { searchApi } from "../services/search";
import { updateApi } from "../services/update";
import { usersApi } from "../services/users";
import productListSlice from "./allProductsSlice";
import answersListSlice from "./answersListSlice";
import authSlice from "./authSlice";
import commentsListSlice from "./commentsListSlice";
import compareSlice from "./compareSlice";
import isDarkSlice from "./darkModeSlice";
import homePageSlice from "./homePageSlice";
import languageSlice from "./languageSlice";
import { snackbarErrorHandle } from "./middlewares/errorSnackbarHandleMiddleware";
import questionsSlice from "./questionsSlice";
import reviewsSlice from "./reviewsSlice";
import menuSlice from "./uiMenuSlice";
import postingModalSlice from "./uiPostingModalSlice";
import regDialogSlice from "./uiRegisterDialogSlice";
import sendReportSlice from "./uiSendReportSlice";
import snackbarSlice from "./uiSnackbarSlice";

export const store = configureStore({
  reducer: {
    [reportsApi.reducerPath]: reportsApi.reducer,
    [phoneApi.reducerPath]: phoneApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [updateApi.reducerPath]: updateApi.reducer,
    [phoneReviewsApi.reducerPath]: phoneReviewsApi.reducer,
    [companyReviewsApi.reducerPath]: companyReviewsApi.reducer,
    [phoneQuestionsApi.reducerPath]: phoneQuestionsApi.reducer,
    [companyQuestionsApi.reducerPath]: companyQuestionsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [competetionApi.reducerPath]: competetionApi.reducer,
    [productListSlice.name]: productListSlice.reducer,
    [reviewsSlice.name]: reviewsSlice.reducer,
    [homePageSlice.name]: homePageSlice.reducer,
    [questionsSlice.name]: questionsSlice.reducer,
    [commentsListSlice.name]: commentsListSlice.reducer,
    [answersListSlice.name]: answersListSlice.reducer,
    [languageSlice.name]: languageSlice.reducer,
    [compareSlice.name]: compareSlice.reducer,
    [isDarkSlice.name]: isDarkSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [regDialogSlice.name]: regDialogSlice.reducer,
    [snackbarSlice.name]: snackbarSlice.reducer,
    [postingModalSlice.name]: postingModalSlice.reducer,
    [sendReportSlice.name]: sendReportSlice.reducer,
    [menuSlice.name]: menuSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(snackbarErrorHandle)
      // .concat(rtkQueryErrorLogger)
      .concat(phoneReviewsApi.middleware)
      .concat(phoneApi.middleware)
      .concat(searchApi.middleware)
      .concat(companyReviewsApi.middleware)
      .concat(phoneQuestionsApi.middleware)
      .concat(companyQuestionsApi.middleware)
      .concat(homeApi.middleware)
      .concat(competetionApi.middleware)
      .concat(usersApi.middleware)
      .concat(reportsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
