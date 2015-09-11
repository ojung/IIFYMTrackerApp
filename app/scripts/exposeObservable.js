import Kefir from 'kefir';

export default function(createStore) {
  return (reducer, initalState) => {
    const store = createStore(reducer, initalState);
    return {...store, eventStream: stream(store)};
  };
}

const stream = store => () =>
  Kefir.stream(emitter => store.subscribe(() => emitter.emit(store.getState())));
