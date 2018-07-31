import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as routes from '../../lib/routes';

const mapStateToProps = state => ({
  token: state.token.token,
});

const AuthRedirect = (props) => {
  const renderFinalDestination = (pathname, token) => {
    const isRegisteredRoute = pathname === routes.LOGIN_ROUTE || pathname === routes.SIGNUP_ROUTE || pathname === routes.ROOT_ROUTE;

    if (isRegisteredRoute) {
      if (token) {
        return <Redirect to={routes.DASHBOARD_ROUTE} />;
      }
      return null;
    } 

    if (!token) {
      return <Redirect to={routes.ROOT_ROUTE} />;
    }
    return null;
  };

  const { location, token } = props;
  const { pathname } = location;
  return (
    <div className="auth-redirect">
      { renderFinalDestination(pathname, token) }
    </div>
  );
};

AuthRedirect.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  token: PropTypes.string,
};

export default connect(mapStateToProps)(AuthRedirect);
