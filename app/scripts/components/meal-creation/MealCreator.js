import Immutable from 'immutable';
import React from 'react';
import {connect} from 'react-redux';

import FilterableSearchResults from './FilterableSearchResults';
import FloatingActionButton from '../FloatingActionButton';
import MealSearchForm from './MealSearchForm';
import SelectedItems from './SelectedItems';
import {
  addItem,
  removeItem,
  searchFood,
  storeConsumptionEvent,
  updateSearchText,
} from '../../actions/meal-creation';

class MealCreator extends React.Component {
  static propTypes = {
    searchText: React.PropTypes.string,
    selectedItems: React.PropTypes.instanceOf(Immutable.Set),
    searchResults: React.PropTypes.instanceOf(Immutable.List),
  }

  render() {
    const {
      dispatch,
      searchIsCached,
      searchResults,
      searchText,
      selectedItems,
    } = this.props;

    if (searchText.length >= 3 && !searchIsCached) {
      dispatch(searchFood(searchText));
    }

    return (
      <div>
        <FloatingActionButton onClick={() =>
          dispatch(storeConsumptionEvent(selectedItems))}/>
        <MealSearchForm
          searchText={searchText}
          onUserInput={(text) => dispatch(updateSearchText(text))}/>
        <SelectedItems
          items={selectedItems}
          onClick={(item) => dispatch(removeItem(item))}/>
        <FilterableSearchResults
          items={searchResults}
          onClick={(item) => {
            dispatch(addItem(item));
            dispatch(updateSearchText(''));
          }}/>
      </div>
    );
  }
}

function select(state) {
  const ui = state.get('ui');
  const data = state.get('data');
  const searchText = ui.get('searchText');
  const selectedItems = ui.get('selectedItems');

  return {
    searchIsCached: data.get('searchResults').has(searchText),
    searchResults: filterSearchResults(data, searchText, selectedItems),
    searchText,
    selectedItems: selectedItems,
  };
}

function filterSearchResults(data, searchText, selectedItems) {
  return data.get('searchResults')
    .reduce((results, result) => results.concat(result), Immutable.List())
    .filter(isNotSelected(selectedItems))
    .filter(matchesSearchText(searchText));
}

const matchesSearchText = searchText => result => {
  const regexp = new RegExp(searchText, 'i');
  return searchText === '' || result.get('name').match(regexp);
};

const isNotSelected = selectedItems => result => {
  const name = result.name;
  return !selectedItems.find(item => item.get('name') === name);
};

export default connect(select)(MealCreator);
