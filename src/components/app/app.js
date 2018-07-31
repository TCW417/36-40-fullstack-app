import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from '../landing/landing';
import Dashboard from '../dashboard/dashboard';
import AuthRedirect from '../auth-redirect/auth-redirect';

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div>
          <Route exact path="*" component={ AuthRedirect } />
          <Route exact path="/" component={ Landing } />
          <Route exact path="/signup" component={ Landing } />
          <Route exact path="/login" component={ Landing } />
          <Route exact path="/dashboard" component={ Dashboard } />
        </div>
      </BrowserRouter>
    </div>
  );
}

// export default connect(mapStateToProps, null)(App);
