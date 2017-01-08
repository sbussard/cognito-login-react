import React from 'react';
import configureStore from '~/state/configureStore';
import {
  LoginLayout,
  DashboardLayout,
  LoggedOutLayout
} from '~/components/Layout';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { ROUTES } from '~/configuration';
import '~/theme/base.scss';

let containerSelector = '.App';
let appContainer = document.querySelector(containerSelector);
let globalStore = configureStore();

let Root = ({store}) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path={ROUTES.LOG_IN} component={LoginLayout} />
      <Route path={ROUTES.DASHBOARD} component={DashboardLayout} />
      <Route path={ROUTES.LOGGED_OUT} component={LoggedOutLayout} />
    </Router>
  </Provider>
);

render(<Root store={globalStore}/>, appContainer);
