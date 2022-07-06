import * as firebase from "firebase/app";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./store/store";

import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";

import config from "./firebase-config.json";
import "./index";

firebase.initializeApp(config);
const auth = getAuth();

setPersistence(auth, browserLocalPersistence).then((user) => {});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
