import Immutable from 'immutable';
import {combineReducers} from 'redux';

import {
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_SEARCHTEXT
} from '../actions/meal-creation';

function searchText(state = '', action) {
  const {type, text} = action;
  if (type === UPDATE_SEARCHTEXT) {
    return text;
  }
  return state;
}

const initialSelectedItems = Immutable.Set();
function selectedItems(state = initialSelectedItems, action) {
  const {type, item} = action;
  if (type === ADD_ITEM) {
    return state.add(item);
  }
  if (type === REMOVE_ITEM) {
    return state.remove(item);
  }
  return state;
}

export const mealCreation = combineReducers({searchText, selectedItems});
