// error-logger
import {
  ce, cg, cge, cl,
} from '../utils';

export default store => next => (action) => {
  try {
    const result = next(action);
    return result;
  } catch (err) {
    cg('ERROR-LOGGER');
    cl(store.getStore());
    ce(err);
    cge();
    return next(action);
  }
};
