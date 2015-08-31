import Immutable from 'immutable';
import moment from 'moment';

import {
  ADD_ITEM,
  RECEIVE_SEARCH_RESULTS,
  REMOVE_ITEM,
  SET_IS_FETCHING,
  STORE_CONSUMPTION_EVENT,
  UPDATE_SEARCHTEXT,
} from '../actions/meal-creation';

export function searchText(state = '', action) {
  if (action.type === UPDATE_SEARCHTEXT) {
    return action.text;
  }
  return state;
}

export function selectedItems(state = Immutable.Set(), action) {
  const {type, item} = action;
  if (type === ADD_ITEM) {
    return state.add(item);
  }
  if (type === REMOVE_ITEM) {
    return state.remove(item);
  }
  return state;
}

export function consumptionEvents(state = Immutable.List(), action) {
  const {type, foodItems} = action;
  if (type === STORE_CONSUMPTION_EVENT) {
    return state.push(consumptionEvent(foodItems));
  }
  return state;
}

function consumptionEvent(foodItems) {
  const totalEnergy = foodItems.reduce((item, acc) => acc + item.energyValue);
  return Immutable.Map({
    consumedItems: foodItems,
    totalEnergy,
    dateTime: moment(),
  });
}

export function searchResults(state = Immutable.Map(), action) {
  if (action.type === RECEIVE_SEARCH_RESULTS) {
    return getOrUpdate(state, action.searchText, action.searchResults);
  }
  return state;
}

function getOrUpdate(map, key, value) {
  if (!map.has(key)) {
    return map.set(key, Immutable.Set(value));
  }
  const oldSet = map.get(key);
  return map.set(key, oldSet.union(value));
}

export function isFetching(state = false, action) {
  if (action.type === SET_IS_FETCHING) {
    return action.isFetching;
  }
  return state;
}
