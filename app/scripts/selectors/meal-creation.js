import Immutable from 'immutable';
import {createSelector, createSelectorCreator} from 'reselect';

const searchTextSelector = state => state.get('ui').get('searchText');

const selectedItemsSelector = state => state.get('ui').get('selectedItems');

const searchResultsSelector = state => state.get('data').get('searchResults');

const immutableCreateSelector = createSelectorCreator(Immutable.is);

const searchResultSetSelector = immutableCreateSelector(
  searchResultsSelector,
  (searchResults) => searchResults
    .reduce((results, result) => results.union(result), Immutable.Set())
);

const selectedSearchResultsSelector = immutableCreateSelector(
  [selectedItemsSelector, searchResultSetSelector],
  (selectedItems, searchResults) =>
    searchResults.filter(isSelected(selectedItems))
);

const isSelected = selectedItems => result => {
  const name = result.get('name');
  return selectedItems.find(item => item.get('name') === name);
};

const searchResultsNotMatchingSearchTextSelector = immutableCreateSelector(
  [searchTextSelector, searchResultSetSelector],
  (searchText, searchResults) => searchResults.filter(doesNotMatch(searchText))
);

const doesNotMatch = searchText => result => {
  const regexp = new RegExp(searchText, 'i');
  return !result.get('name').match(regexp);
};

const filteredSearchResultsSelector = immutableCreateSelector([
  searchResultsNotMatchingSearchTextSelector,
  selectedSearchResultsSelector,
  searchResultSetSelector,
], (notMatchingSearchResults, selectedSearchResults, searchResults) => {
  return searchResults
    .subtract(notMatchingSearchResults.union(selectedSearchResults))
    .take(50);
});

const mealCreationSelector = immutableCreateSelector([
  searchTextSelector,
  selectedItemsSelector,
  filteredSearchResultsSelector,
], (searchText, selectedItems, searchResults) => {
  return {searchResults, searchText, selectedItems};
});

export default mealCreationSelector;
