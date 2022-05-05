import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import * as firebase from "firebase/app";

import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";

import config from "./firebase-config.json";
import "./index";
import { useAppDispatch } from "./store/hooks";
import { authActions } from "./store/authSlice";
import {
  useAuthenticateMutation,
  useGetCurrentUserProfileMutation,
} from "../src/services/users";

const app = firebase.initializeApp(config);
const auth = getAuth();

// const [getApiToken] = useAuthenticateMutation();
// const [getProfile] = useGetCurrentUserProfileMutation();

setPersistence(auth, browserLocalPersistence).then((user) => {});

// const signIn = async (user) => {
//   const { token: apiToken } = await getApiToken(user.accessToken).unwrap();
//   const userProfile = await getProfile(apiToken).unwrap();

//   useAppDispatch(
//     authActions.login({
//       isLoggedIn: true,
//       uid: userProfile.uid,
//       refCode: userProfile.refCode,
//       photo: userProfile.photo,
//       apiToken: apiToken,
//       name: userProfile.name,
//       accessToken: user.accessToken,
//       refreshToken: user.refreshToken,
//       email: user.email,
//       points: userProfile.points,
//     })
//   );
// };

// getAuth().onAuthStateChanged(async (user) => {
//   if (user) {
//     console.log("aaa");
//     try {
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
