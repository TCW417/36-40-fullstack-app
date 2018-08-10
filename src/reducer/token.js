import { readCookie } from '../lib/cookieLib';

const defaultState = {
  token: readCookie('RaToken'), // will return null if no cookie
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      return { ...defaultState, token: payload };
    case 'TOKEN_REMOVE':
      return { ...defaultState, token: null }; // force token to null for async reasons
    default: 
      return state;
  }
};
