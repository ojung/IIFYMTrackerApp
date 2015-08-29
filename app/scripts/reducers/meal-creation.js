import Immutable from 'immutable';
import moment from 'moment';

import {
  ADD_ITEM,
  REMOVE_ITEM,
  STORE_CONSUMPTION_EVENT,
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

const initialConsumptionEvents = Immutable.List();
export function consumptionEvents(state = initialConsumptionEvents, action) {
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
