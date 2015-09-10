import assert from 'assert';

import Immutable from 'immutable';

import persist from '../../app/scripts/persist';

import MockLocalStorage from '../lib/MockLocalStorage';
import MockStore from '../lib/MockStore';
import withContext from '../lib/withContext';

describe('persist local storage store enhancer', () => {
  const getStoreAndStorage = () => {
    const storage = new MockLocalStorage();
    const store = new MockStore();
    return {storage, store};
  };

  it('should write state to the storage', withContext(getStoreAndStorage, (context, done) => {
    const {store, storage} = context;
    const debounceIntervalInMs = 1;

    persist(storage, debounceIntervalInMs)(() => store)({}, Immutable.fromJS({}));

    const state = {data: 'data', ui: 'iu'};
    store.setState(Immutable.Map(state))

    // Needed, because perist is debounced
    setTimeout(() => {
      assert.equal(storage.getItem('redux-store'), JSON.stringify(state),
                   'unexpected storage contents');
      done();
    }, debounceIntervalInMs + 1);
  }));

  const getStorage = () => new MockLocalStorage();

  it('should merge localState and initalState', withContext(getStorage, (storage, done) => {
    const localState = {data: {local: 'data'}};
    storage.setItem('redux-store', JSON.stringify(localState))

    const initalState = Immutable.fromJS({data: {}, ui: {}});

    persist(storage, 1)((reducer, state) => {
      const expectedState = Immutable.fromJS(Object.assign({}, localState, {ui: {}}));
      assert(Immutable.is(state, expectedState), 'unexpected initalState');
      done();
      return new MockStore();
    })({}, initalState);
  }));
});
