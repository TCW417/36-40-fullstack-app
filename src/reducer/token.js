const defaultState = {
  token: '',
  signupError: false,
  loginError: false,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      return { ...defaultState, token: payload };
    case 'TOKEN_REMOVE':
      return defaultState;
    case 'TOKEN_AUTH_ERROR':
      return { ...defaultState, [payload.error]: true };
    default: 
      return state;
  }
};
