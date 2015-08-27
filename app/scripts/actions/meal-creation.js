export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
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
