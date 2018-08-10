import React from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';

import './auth-form.scss';

const emptyState = {
  username: '',
  usernameError: <span className="error icon-cross"></span>,
  usernameValid: false,
  email: '',
  emailError: <span className="error icon-cross"></span>,
  emailValid: false,
  password: '',
  passwordError: <span className="error icon-cross"></span>,
  passwordValid: false,
  submitValid: true,
  submitError: '',
};

const MIN_USERNAME_LENGTH = 5;
const MIN_PASSWORD_LENGTH = 5;

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = emptyState;
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    let error;
    let valid;
    switch (name) {
      case 'username':
        if (value.length < MIN_USERNAME_LENGTH) {
          error = <span className="error icon-cross"></span>;
          valid = false;
        } else {
          error = <span className="valid icon-checkmark"></span>;
          valid = true;
        }
        break;
      case 'email':
        if (!isEmail(value)) {
          error = <span className="error icon-cross"></span>;
          valid = false;
        } else {
          error = <span className="valid icon-checkmark"></span>;
          valid = true;
        }
        break;
      case 'password':
        if (value.length < MIN_PASSWORD_LENGTH) {
          error = <span className="error icon-cross"></span>;
          valid = false;
        } else {
          error = <span className="valid icon-checkmark"></span>;
          valid = true;
        }
        break;
      default:
        break;
    }
    return this.setState({
      ...this.state, 
      [name]: value, 
      [`${name}Valid`]: valid, 
      [`${name}Error`]: error, 
    });
  } 

  handleSubmit = (event) => {
    event.preventDefault();
    const validEmail = this.props.type === 'login' ? true : this.state.emailValid;
    const validSignupForm = () => {
      return this.state.usernameValid && this.state.passwordValid && validEmail;
    };

    if (validSignupForm()) {
      this.props.onComplete(this.state)
        .then(() => {
          this.setState(emptyState);
        })
        .catch((error) => {
          if (error.status === 409) {
            this.setState({ ...this.state, submitValid: false, submitError: 'Duplicate username and/or email.' });
          } else {
            this.setState({ ...this.state, submitValid: false, submitError: `Error status ${error.status} returned.` });
          }
        });
    } else {
      this.setState({ ...this.state, submitValid: false, submitError: 'All entries must be valid.' });
    }
  }

  renderEmailInput = (type) => {
    return type === 'signup' && (
      <div>
        <input 
          name="email"
          placeholder="email"
          type="email"
          value={ this.state.email }
          onChange={ this.handleChange }
        />
        <span className={this.state.emailValid ? 'valid icon-checkmark' : 'error icon-cross' }></span>
      </div>
    );
  }

  render() {
    let { type } = this.props;
    type = type === 'login' ? type : 'signup';
      
    return (
      <div>
        <form className="auth-form" onSubmit={ this.handleSubmit }>
          <input 
            name="username"
            placeholder="username"
            type="text"
            value={ this.state.username }
            onChange={ this.handleChange }
          />
          <span className={this.state.usernameValid ? 'valid' : 'error' }>{ type === 'signup' ? this.state.usernameError : '' }</span>

          { this.renderEmailInput(type) }

          <input 
            name="password"
            placeholder="password"
            type="password"
            value={ this.state.password }
            onChange={ this.handleChange }
          />
          <span className={this.state.passwordValid ? 'valid' : 'error' }>{ type === 'signup' ? this.state.passwordError : '' }</span>
          <div className="error">
          { this.state.submitError }
          </div>
          <div>
          <button type="submit">{ type }</button>
          </div>
        </form>
      </div>
    );
  }
}

AuthForm.propTypes = {
  onComplete: PropTypes.func,
  type: PropTypes.string,
  signupError: PropTypes.bool,
  loginError: PropTypes.bool,
};
