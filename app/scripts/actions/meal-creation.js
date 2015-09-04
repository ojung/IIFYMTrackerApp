import Immutable from 'immutable';
import fetch from 'isomorphic-fetch';

export const ADD_ITEM = 'ADD_ITEM';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SET_IS_FETCHING = 'SET_IS_FETCHING';
export const STORE_CONSUMPTION_EVENT = 'STORE_CONSUMPTION_EVENT';
export const UPDATE_SEARCHTEXT = 'UPDATE_SEARCHTEXT';

const apiUrl = '//localhost:3000';

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


export function storeMeal(items) {
  const orderedItems = items.toList();

  return dispatch => {
    dispatch(setIsFetching(true));

    const promises = orderedItems.map(fetchNutrients);
    Promise.all(promises)
      .then(mergeNutrients(orderedItems))
      .then(mergedItems => {
        dispatch(storeConsumptionEvent(mergedItems));
        dispatch(setIsFetching(false));
      });
  };
}

const mergeNutrients = foodItems => nutrients => {
  return foodItems.zipWith((a, b) => a.concat(b), nutrients);
};

function fetchNutrients(item) {
  return fetch(`${apiUrl}/nutrients/${item.get('ndbno')}`)
    .then(response => response.json())
    .then(Immutable.fromJS);
}

function storeConsumptionEvent(foodItems) {
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

    const promise = fetch(`${apiUrl}/search?q=${searchText}`)
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
};

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
