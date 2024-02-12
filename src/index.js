import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import global_en from "./translation/en/global.json";
import global_hi from "./translation/hindi/global.json";
import global_bn from "./translation/ben/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "./redux/store";

i18next.init({
  interpolation: { escapeValue: true },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    hi: {
      global: global_hi,
    },
    bn: {
      global: global_bn,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>
);
reportWebVitals();
