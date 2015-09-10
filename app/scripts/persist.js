export default function(storage, debounceInterval) {
  return createStore => (reducer, initalState) => {
    const store = createStore(reducer, initalState);

    store.eventStream()
      .debounce(debounceInterval)
      .map(state => JSON.stringify(state.toJS()))
      .onValue(state => storage.setItem('redux-store', state));

    return {...store};
  };
}
