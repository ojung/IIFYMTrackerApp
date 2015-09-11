import Immutable from 'immutable';
import transit from 'transit-immutable-js';

export default function(storage, key) {
  const localState = storage.getItem(key);
  if (!localState) {
    return Immutable.Map({
      ui: Immutable.Map(),
      data: Immutable.Map()
    });
  }
  return transit.fromJSON(localState);
}
