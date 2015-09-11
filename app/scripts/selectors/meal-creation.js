import Immutable from 'immutable';
import {createSelectorCreator} from 'reselect';

const immutableCreateSelector = createSelectorCreator(Immutable.is);

const searchTextSelector = state => state.get('ui').get('searchText');

const selectedItemsSelector = state => state.get('ui').get('selectedItems');

const searchResultsSelector = state => state.get('data').get('searchResults');

const isFetchingSelector = state => state.get('ui').get('isFetching');

const searchResultSetSelector = immutableCreateSelector(
  searchResultsSelector,
  (searchResults) =>
    searchResults.reduce((results, result) => results.union(Immutable.Set(result)), Immutable.Set())
);

const selectedSearchResultsSelector = immutableCreateSelector(
  [selectedItemsSelector, searchResultSetSelector],
  (selectedItems, searchResults) => searchResults.filter(isSelected(selectedItems))
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
  const subtractor = notMatchingSearchResults.union(selectedSearchResults);
  return searchResults.subtract(subtractor).take(50);
});

const isCachedSelector = immutableCreateSelector(
  [searchTextSelector, searchResultsSelector],
  (searchText, searchResults) => searchResults.has(searchText.trim())
);

const mealCreationSelector = immutableCreateSelector([
  searchTextSelector,
  selectedItemsSelector,
  filteredSearchResultsSelector,
  isCachedSelector,
  isFetchingSelector,
], (searchText, selectedItems, searchResults, isCached, isFetching) => {
  return {searchResults, searchText, selectedItems, isCached, isFetching};
});

export default mealCreationSelector;
