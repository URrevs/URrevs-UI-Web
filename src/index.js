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

const app = firebase.initializeApp(config);

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
