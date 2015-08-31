import Immutable from 'immutable';
import fetch from 'isomorphic-fetch';

export const ADD_ITEM = 'ADD_ITEM';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SET_IS_FETCHING = 'SET_IS_FETCHING';
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
  return (dispatch, state) => {
    const isFetching = state.get('ui').get('isFetching');

    if (isFetching) {
      return;
    }

    dispatch(setIsFetching(true));

    const promise = fetch('//localhost:3000/search?q=' + searchText)
      .then(response => response.json())
      .then(Immutable.fromJS)
      .then(searchResults =>
            searchResults.map(result => result.delete('offset')))
      .then(receiveSearchResults(searchText));

    dispatch(promise);
  };
}

const receiveSearchResults = searchText => searchResults => {
  return dispatch => {
    dispatch(receiveResults(searchResults, searchText));
    dispatch(setIsFetching(false));
  };
}

function receiveResults(searchResults, searchText) {
  return {
    searchResults,
    searchText,
    type: RECEIVE_SEARCH_RESULTS,
  };
}

export function setIsFetching(isFetching) {
  return {
    isFetching,
    type: SET_IS_FETCHING,
  };
}
