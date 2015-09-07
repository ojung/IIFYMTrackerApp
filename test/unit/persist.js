import assert from 'assert';

import Immutable from 'immutable';

import persist from '../../app/scripts/persist';

import MockLocalStorage from '../lib/MockLocalStorage';
import MockStore from '../lib/MockStore';

describe('persist local storage store enhancer', () => {

  let storage;
  let store;
  before(() => {
    storage = new MockLocalStorage();
    store = new MockStore();
  });

  it('should work store data events to the storage', done => {
    const debounceIntervalInMs = 1;

    persist(storage, debounceIntervalInMs)(() => store)(() => {}, {});

    const state = {data: 'data', ui: 'iu'};

    store.setState(Immutable.Map(state))
    store.triggerChange();

    // Needed, because perist is debounced
    setTimeout(() => {
      assert.equal(storage.getItem('redux-store'), JSON.stringify(state));
      done();
    }, debounceIntervalInMs + 1);
  });
});

