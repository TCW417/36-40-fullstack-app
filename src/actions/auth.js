import superagent from 'superagent';
import * as routes from '../lib/routes';

// These are sync action creators

export const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

// we don't need a payload here because all we're doing is taking the token that is already set as a cookie in our browser and removing it
export const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

export const authError = token => ({
  type: 'TOKEN_AUTH_ERROR',
  payload: token,
});

// These are async action creators

export const userSignup = user => (dispatch) => {
  /*
    {
      username: 
      email: 
      password
    }
  */

  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    .withCredentials() // The .withCredentials() method enables the ability to send cookies from the origin
    .then((response) => {
      return dispatch(setToken(response.body.token));
    });
};

// userLogin(user)(store)
export const userLogin = user => (dispatch) => {
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      return dispatch(setToken(response.body.token));
    });
};
