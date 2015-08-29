const promise = store => next => action => {
  if (!action || typeof action.then !== 'function') {
    return next(action);
  }
  return action.then(store.dispatch);
};
export default promise;

