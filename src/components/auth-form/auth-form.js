import React from 'react';
import PropTypes from 'prop-types';
import './auth-form.scss';

const emptyState = {
  username: '',
  email: '',
  password: '',
  error: false,
};

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  renderEmailInput = (type) => {
    return type === 'signup' && (
      <input 
        name="email"
        placeholder="email"
        type="email"
        value={ this.state.email }
        onChange={ this.handleChange }
      />
    );
  }

  render() {
    let { type } = this.props;
    type = type === 'login' ? type : 'signup';
    let formClass = 'auth-form';
    if (this.state.error) formClass = 'auth-form error-state';
    return (
      <form className={ formClass } onSubmit={ this.handleSubmit }>
        <input 
          name="username"
          placeholder="username"
          type="text"
          value={ this.state.username }
          onChange={ this.handleChange }
        />

        { this.renderEmailInput(type) }

        <input 
          name="password"
          placeholder="password"
          type="password"
          value={ this.state.password }
          onChange={ this.handleChange }
        />
        <button type="submit">{ type }</button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  onComplete: PropTypes.func,
  type: PropTypes.string,
};
