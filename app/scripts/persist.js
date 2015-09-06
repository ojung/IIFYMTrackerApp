import Immutable from 'immutable';
import Kefir from 'kefir';

const localStorage = window.localStorage;

const persist = next => (reducer, initalState) => {
  const localState = rehydrate(localStorage.getItem('redux-store'));
  const state = localState.merge(initalState);
  const store = next(reducer, state);

  dataStream(store)
    .debounce(250)
    .map(serialize)
    .onValue(saveToLocalStorage);

  return {...store};
}
export default persist;

const rehydrate = state => {
  return Immutable.Map({
    data: Immutable.fromJS(JSON.parse(state)),
    ui: Immutable.Map(),
  });
};

const serialize = state => JSON.stringify(state.toJS());

const saveToLocalStorage = state => localStorage.setItem('redux-store', state);

const dataStream = store => {
  return Kefir.stream(listener(store));
};

const listener = store => emitter => {
  store.subscribe(() => {
    const state = store.getState();
    emitter.emit(state.get('data'));
  });
};
