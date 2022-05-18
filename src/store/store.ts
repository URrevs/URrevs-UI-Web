import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { phoneReviewsApi } from "../services/phone_reviews";
import { companyReviewsApi } from "../services/company_reviews";
import { phoneQuestionsApi } from "../services/phone_questions";
import { companyQuestionsApi } from "../services/company_questions";
import { usersApi } from "../services/users";
import authSlice from "./authSlice";
import isDarkSlice from "./darkModeSlice";
import languageSlice from "./languageSlice";
import reviewsSlice from "./reviewsSlice";
import commentsListSlice from "./commentsListSlice";
import regDialogSlice from "./uiRegisterDialogSlice";
import snackbarSlice from "./uiSnackbarSlice";
import { updateApi } from "../services/update";
import { searchApi } from "../services/search";
import { phoneApi } from "../services/phones";
import compareSlice from "./compareSlice";
import { companyApi } from "../services/companies";

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
    [reviewsSlice.name]: reviewsSlice.reducer,
    [commentsListSlice.name]: commentsListSlice.reducer,
    [languageSlice.name]: languageSlice.reducer,
    [compareSlice.name]: compareSlice.reducer,
    [isDarkSlice.name]: isDarkSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [regDialogSlice.name]: regDialogSlice.reducer,
    [snackbarSlice.name]: snackbarSlice.reducer,
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
