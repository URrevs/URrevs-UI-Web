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

// TODO: Add only on production
// disable right click
document.onmousedown = disableclick;
function disableclick(event) {
  if (event.button == 2) {
    return false;
  }
}

// TODO: Add only on production
// disable f12
document.onkeydown = disableF12;
function disableF12(event) {
  if (event.code == "F12") {
    return false;
  }
}

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
