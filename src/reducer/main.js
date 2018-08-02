import { combineReducers } from 'redux';
import token from './token';
import profile from './profile';
import attachments from './attachment';

export default combineReducers({
  token,
  profile,
  attachments,
});
