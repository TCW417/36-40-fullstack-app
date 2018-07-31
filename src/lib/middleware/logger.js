// copied directly from https://redux.js.org/advanced/middleware
// examples.

import {
  cl, ci, cg, cge,
} from '../utils';

// this is intended to be imported as "logger"
export default store => next => (action) => { // eslint-disable-line
  cg(action.type);
  ci('dispatching', action);
  const result = next(action);
  cl('next state', store.getState());
  cge();
  return result;
};
