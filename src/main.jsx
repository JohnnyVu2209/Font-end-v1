import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import setupInterceptors from "./services/setupInterceptors";
import { LayoutProvider } from "./context/LayoutContext";
//import { UserProvider } from "./context/UserContext";
import { Provider } from "react-redux";
import { store } from "./features/store"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import i18n from './translation/i18next';
import { I18nextProvider } from "react-i18next";

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import vi from 'javascript-time-ago/locale/vi.json'

TimeAgo.addDefaultLocale(vi)
TimeAgo.addLocale(en)

setupInterceptors(store);
ReactDOM.render(
  <Provider store={store}>
    <LayoutProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={Themes.default}>
          <I18nextProvider i18n={i18n}>
            <CssBaseline />
            <App />
          </I18nextProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </LayoutProvider>
  </Provider>
  ,
  document.getElementById("root"),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
