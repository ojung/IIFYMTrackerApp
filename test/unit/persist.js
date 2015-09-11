import assert from 'assert';

import Immutable from 'immutable';
import transit from 'transit-immutable-js';

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

    const state = Immutable.Map({data: 'data', ui: 'iu'});
    store.setState(state);

    const storageKey = 'test';
    const debounceIntervalInMs = 1;
    persist(storage, storageKey, debounceIntervalInMs)(() => store)();

    // Needed, because perist is debounced
    setTimeout(() => {
      assert.equal(storage.getItem(storageKey), transit.toJSON(state),
                   'unexpected storage contents');
      done();
    }, debounceIntervalInMs + 1);
  }));
});
