import type { TypedAddListener, TypedStartListening } from "@reduxjs/toolkit";
import { addListener, createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { authActions } from "../authSlice";
import type { AppDispatch, RootState as RootStateType } from "../store";

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootStateType, AppDispatch>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  RootStateType,
  AppDispatch
>;

listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    const state = currentState;

    // update token if expiry date is soon
    const expirationDate: Date = new Date(
      (state as RootState).auth.expiration * 1000
    );
    const currentDate: Date = new Date();

    if (expirationDate.getTime()) {
      const timeLeft: boolean =
        expirationDate.getTime() - currentDate.getTime() < 100;

      return timeLeft;
    }
    return false;
  },
  effect: async (action, listenerApi) => {
    const { getState, dispatch } = listenerApi;
    const state = getState();

    const accessToken = (state as RootState).auth.accessToken;
    const currentUser = (state as RootState).auth;
    let data;

    setTimeout(() => {}, 5000);

    await fetch(`${process.env.REACT_APP_API_PATH}/users/authenticate`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      response.json().then(async (data) => {
        console.log(data.exp);
        dispatch(
          authActions.login({
            ...currentUser,
            apiToken: data.token,
            expiration: data.exp,
          })
        );
      });
    });

    // wait
    if (
      await listenerApi.condition((action, currentState, previousState) => {
        const state = currentState;

        const expirationDate: Date = new Date(
          (state as RootState).auth.expiration * 1000
        );
        const currentDate: Date = new Date();

        let timeLeft: boolean = false;
        if (expirationDate.getTime()) {
          timeLeft = expirationDate.getTime() - currentDate.getTime() > 10000;
        }
        console.log(timeLeft);
        return timeLeft;
      }, 500)
    ) {
    }
  },
});
