import superagent from 'superagent';
import * as routes from '../lib/routes';

// sync action creators

export const setProfile = profile => ({
  type: 'PROFILE_SET',
  payload: profile,
});

// async action creator
export const createProfile = profile => (dispatch, getState) => {
  console.log('actions/profile.js createProfile store', getState());
  const { token } = getState().token;

  return superagent.post(`${API_URL}${routes.PROFILE_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json') // TODO: is this needed?
    .send(profile)
    .then((response) => {
      return dispatch(setProfile(response.body));
    });
};

// this update should be written with a FULL UNDERSTANDING of how your backend works and if you even have an update profile route to begin with
export const updateProfile = profile => (dispatch, getState) => {
  const { token } = getState().token;
  console.log('updateProfile token', token);
  return superagent.put(`${API_URL}${routes.PROFILE_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      console.log('updatePofile response.body', response.body);
      return dispatch(setProfile(response.body));
    });
};

export const fetchProfile = () => (dispatch, getState) => {
  const { token } = getState().token;
  console.log('actions/profile.js fetchProfile token', token);

  return superagent.get(`${API_URL}${routes.PROFILE_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      return dispatch(setProfile(response.body));
    });
};
