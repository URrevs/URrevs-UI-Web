import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { companyApi } from "../services/companies";
import { companyQuestionsApi } from "../services/company_questions";
import { companyReviewsApi } from "../services/company_reviews";
import { phoneApi } from "../services/phones";
import { phoneQuestionsApi } from "../services/phone_questions";
import { phoneReviewsApi } from "../services/phone_reviews";
import { searchApi } from "../services/search";
import { updateApi } from "../services/update";
import { usersApi } from "../services/users";
import productListSlice from "./allProductsSlice";
import answersListSlice from "./answersListSlice";
import authSlice from "./authSlice";
import commentsListSlice from "./commentsListSlice";
import compareSlice from "./compareSlice";
import isDarkSlice from "./darkModeSlice";
import languageSlice from "./languageSlice";
import questionsSlice from "./questionsSlice";
import reviewsSlice from "./reviewsSlice";
import menuSlice from "./uiMenuSlice";
import regDialogSlice from "./uiRegisterDialogSlice";
import snackbarSlice from "./uiSnackbarSlice";

export const store = configureStore({
  reducer: {
    [phoneApi.reducerPath]: phoneApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [updateApi.reducerPath]: updateApi.reducer,
    [phoneReviewsApi.reducerPath]: phoneReviewsApi.reducer,
    [companyReviewsApi.reducerPath]: companyReviewsApi.reducer,
    [phoneQuestionsApi.reducerPath]: phoneQuestionsApi.reducer,
    [companyQuestionsApi.reducerPath]: companyQuestionsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productListSlice.name]: productListSlice.reducer,
    [reviewsSlice.name]: reviewsSlice.reducer,
    [questionsSlice.name]: questionsSlice.reducer,
    [commentsListSlice.name]: commentsListSlice.reducer,
    [answersListSlice.name]: answersListSlice.reducer,
    [languageSlice.name]: languageSlice.reducer,
    [compareSlice.name]: compareSlice.reducer,
    [isDarkSlice.name]: isDarkSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [regDialogSlice.name]: regDialogSlice.reducer,
    [snackbarSlice.name]: snackbarSlice.reducer,
    [menuSlice.name]: menuSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(phoneReviewsApi.middleware)
      .concat(companyReviewsApi.middleware)
      .concat(phoneQuestionsApi.middleware)
      .concat(companyQuestionsApi.middleware)
      .concat(usersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
