// addToLocalStorage middleware
export default store => next => (action) => { // eslint-disable-line
  const result = next(action);
  const state = store.getState();
  const stateKeys = Object.keys(state);
  for (let i = 0; i < stateKeys.length; i++) { 
    localStorage.setItem(stateKeys[i], JSON.stringify(state[stateKeys[i]]));
  }
  return result;
};
