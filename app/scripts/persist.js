import transit from 'transit-immutable-js';

export default function(storage, key, debounceInterval) {
  return createStore => (reducer, initalState) => {
    const store = createStore(reducer, initalState);

    store.eventStream()
      .debounce(debounceInterval)
      .map(transit.toJSON)
      .onValue(state => storage.setItem(key, state));

    return {...store};
  };
}
