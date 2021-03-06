import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import Navbar from '../navbar/navbar';
import AuthForm from '../auth-form/auth-form';
import * as authActions from '../../actions/auth';
import * as routes from '../../lib/routes';

// This component will be connected to the store
const mapStateToProps = (state) => {
  return { // eslint-disable-line
    token: state.token.token,
    signupError: state.token.signupError,
    loginError: state.token.loginError,
  };
};

const mapDispatchToProps = dispatch => ({
  userSignup: user => dispatch(authActions.userSignup(user)),
  userLogin: user => dispatch(authActions.userLogin(user)),
  authError: error => dispatch(authActions.authError(error)),
});

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      signupError: props.signupError,
      loginError: props.loginError,
    };
  }

  handleSignup = (user) => {
    console.log('landing handleSignup user', user);
    return this.props.userSignup(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      });
  };
  
  handleLogin = (user) => {
    return this.props.userLogin(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      });
  };
  
  renderJSX = (pathname) => {

    const signUpJSX = // eslint-disable-line
    <div>
      <h2>Sign Up</h2>
      <h4>Username and password must be at least 5 characters long.</h4>
      <AuthForm key="signup" type="signup" signupError={ this.props.signupError } onComplete={ this.handleSignup }/>
      <p>Already have an account?</p>
      <Link to="/login"> Login </Link>
    </div>;

    const loginJSX = // eslint-disable-line
    <div>
      <h2> login </h2>
      <AuthForm key="login" type="login" loginError={ this.props.loginError } onComplete={ this.handleLogin } />
      <p> Don&#39;t have an account? </p>
      <Link to="/signup"> signup </Link>
    </div>;

    switch (pathname) {
      case routes.SIGNUP_ROUTE:
        return signUpJSX;
      case routes.LOGIN_ROUTE:
        return loginJSX;
      default: 
        return null;
    }
  };

  
  render() {
    const { location } = this.props;
    return (
      <div>
        { this.renderJSX(location.pathname) }
      </div>
    );
  }
}

Landing.propTypes = {
  userLogin: PropTypes.func,
  userSignup: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  token: PropTypes.string,
  signupError: PropTypes.bool,
  loginError: PropTypes.bool,
  authError: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
