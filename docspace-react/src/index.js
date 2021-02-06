import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { IntlProvider } from "react-intl";
import i18nConfig from "./i18n";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.css";
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";

const store = createStore(
  combineReducers({ userReducer, adminReducer }),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </IntlProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
