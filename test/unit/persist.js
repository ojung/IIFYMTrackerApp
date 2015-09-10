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

    const state = {data: 'data', ui: 'iu'};
    store.setState(Immutable.Map(state))

    const debounceIntervalInMs = 1;
    persist(storage, debounceIntervalInMs)(() => store)();

    // Needed, because perist is debounced
    setTimeout(() => {
      assert.equal(storage.getItem('redux-store'), JSON.stringify(state),
                   'unexpected storage contents');
      done();
    }, debounceIntervalInMs + 1);
  }));
});
