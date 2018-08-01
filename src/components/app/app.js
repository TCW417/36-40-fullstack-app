import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from '../landing/landing';
import Dashboard from '../dashboard/dashboard';
import Profile from '../profile/profile';
import AuthRedirect from '../auth-redirect/auth-redirect';
import Navbar from '../navbar/navbar';
import * as routes from '../../lib/routes';

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div>
          <Navbar />
          <Route exact path="*" component={ AuthRedirect } />
          <Route exact path={ routes.ROOT_ROUTE } component={ Landing } />
          <Route exact path={ routes.SIGNUP_ROUTE } component={ Landing } />
          <Route exact path={ routes.LOGIN_ROUTE } component={ Landing } />
          <Route exact path={ routes.DASHBOARD_ROUTE } component={ Dashboard } />
          <Route exact path={ routes.PROFILE_ROUTE } component={ Profile } />
        </div>
      </BrowserRouter>
    </div>
  );
}
