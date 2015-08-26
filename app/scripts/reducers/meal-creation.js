import Immutable from 'immutable';

import {
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_SEARCHTEXT
} from '../actions/meal-creation';

export function searchText(state = '', action) {
  if (action.type === UPDATE_SEARCHTEXT) {
    return action.text;
  }
  return state;
}

const initialSelectedItems = Immutable.Set();
export function selectedItems(state = initialSelectedItems, action) {
  const {type, item} = action;
  if (type === ADD_ITEM) {
    return state.add(item);
  }
  if (type === REMOVE_ITEM) {
    return state.remove(item);
  }
  return state;
}
