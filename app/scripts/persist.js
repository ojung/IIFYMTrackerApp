import Immutable from 'immutable';
import Kefir from 'kefir';

const persist = (storage, debounceInterval) => next => (reducer, initalState) => {
  const localState = rehydrate(storage.getItem('redux-store'));
  const state = localState.merge(initalState);
  const store = next(reducer, state);

  dataStream(store)
    .debounce(debounceInterval)
    .map(serialize)
    .onValue(saveToStorage(storage));

  return {...store};
}
export default persist;

const rehydrate = state => {
  const localState = state && JSON.parse(state) || {};
  return Immutable.fromJS(localState);
};

const serialize = state => JSON.stringify(state.toJS());

const saveToStorage = storage => state => storage.setItem('redux-store', state);

const dataStream = store => Kefir.stream(listener(store));

const listener = store => emitter =>
  store.subscribe(() => emitter.emit(store.getState()));
