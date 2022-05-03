import { configureStore, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { reviewsApi } from "../services/reviews";
import { usersApi } from "../services/users";

import languageSlice from "./languageSlice";
import reviewsSlice from "./reviewsSlice";
import isDarkSlice from "./darkModeSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [reviewsSlice.name]: reviewsSlice.reducer,
    [languageSlice.name]: languageSlice.reducer,
    [isDarkSlice.name]: isDarkSlice.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(reviewsApi.middleware)
      .concat(usersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
