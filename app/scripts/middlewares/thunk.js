const thunk = store => next => action => {
  if (typeof action !== 'function') {
    return next(action);
  }
  return action(store.dispatch, store.getState());
};
export default thunk;
