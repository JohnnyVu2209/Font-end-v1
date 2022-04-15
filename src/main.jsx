import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import { Provider } from 'react-redux'
import store from './store'
import { I18nextProvider } from 'react-i18next';
import en from 'javascript-time-ago/locale/en.json';
import vi from 'javascript-time-ago/locale/vi.json';
import TimeAgo from 'javascript-time-ago';
import i18n from './translation/i18next';

TimeAgo.addDefaultLocale(vi)
TimeAgo.addLocale(en)
ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <LayoutProvider>
        <UserProvider>
          <ThemeProvider theme={Themes.default}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </UserProvider>
      </LayoutProvider>
    </I18nextProvider>
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
