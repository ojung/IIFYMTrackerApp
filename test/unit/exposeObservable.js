import assert from 'assert';

import Kefir from 'kefir';

import exposeObservable from '../../app/scripts/exposeObservable';

describe('exposeObservable', () => {
  function createStore() {
    return {};
  }

  it('should expose a function called eventStream on the store', () => {
    const store = exposeObservable(createStore)();
    assert.equal(typeof store.eventStream, 'function', 'expected eventStream to be a function');
  });

  it('should expose a function returning an observable', () => {
    const store = exposeObservable(createStore)();
    const observable = store.eventStream();
    assert(observable instanceof Kefir.Stream,
           'expected return value of eventStream to be a Kefir.Stream');
  });
});
