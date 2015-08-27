export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const STORE_CONSUMPTION_EVENT = 'STORE_CONSUMPTION_EVENT';
export const UPDATE_SEARCHTEXT = 'UPDATE_SEARCHTEXT';

export function addItem(item) {
  return {
    item,
    type: ADD_ITEM,
  };
}

export function removeItem(item) {
  return {
    item,
    type: REMOVE_ITEM,
  };
}

export function updateSearchText(text) {
  return {
    text,
    type: UPDATE_SEARCHTEXT,
  };
}

export function storeConsumptionEvent(foodItems) {
  return {
    foodItems,
    type: STORE_CONSUMPTION_EVENT,
  };
}
