import Immutable from 'immutable';
import fetch from 'isomorphic-fetch';

export const ADD_ITEM = 'ADD_ITEM';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SEARCH_FOOD = 'SEARCH_FOOD';
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

export function searchFood(searchText) {
  return fetch('//localhost:3000/search?q=' + searchText)
    .then(response => response.json())
    .then(json => receiveSearchResults(Immutable.fromJS(json), searchText));
}

export function receiveSearchResults(searchResults, searchText) {
  return {
    searchResults,
    searchText,
    type: RECEIVE_SEARCH_RESULTS,
  };
}
