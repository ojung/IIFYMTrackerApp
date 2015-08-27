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
  storeConsumptionEvent,
  updateSearchText,
} from '../../actions/meal-creation';

const SEARCHRESULTS = Immutable.fromJS([
  {name: 'Potatoes'},
  {name: 'Chicken Breast'},
  {name: 'Brussel Sprouts'},
  {name: 'Beef'},
  {name: 'Doener Kebab'},
  {name: 'Falafel'},
  {name: 'Schawarma'},
  {name: 'Kumpir'},
  {name: 'Burger'},
  {name: 'Nudelz'},
  {name: 'Capsicum'},
  {name: 'Zuckerpo'},
  {name: 'Cadbury'},
  {name: 'Malteser'},
  {name: 'Pizza'},
], (key, value) => {
  const isIndexed = Immutable.Iterable.isIndexed(value);
  return isIndexed ? value.toList() : value.toOrderedMap();
});

class MealCreator extends React.Component {
  static propTypes = {
    searchText: React.PropTypes.string,
    selectedItems: React.PropTypes.instanceOf(Immutable.Set),
  }

  render() {
    const {dispatch, selectedItems, searchText} = this.props;

    const filteredResults = SEARCHRESULTS
      .filter(isNotSelected(selectedItems))
      .filter(matchesSearchText(searchText));

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
          items={filteredResults}
          onClick={(item) => {
            dispatch(addItem(item));
            dispatch(updateSearchText(''));
          }}/>
      </div>
    );
  }
}

const matchesSearchText = searchText => result => {
  const regexp = new RegExp(searchText, 'i');
  return searchText === '' || result.get('name').match(regexp);
};

const isNotSelected = selectedItems => result => {
  const name = result.get('name');
  return !selectedItems.find((item) => item.get('name') === name);
};

function select(state) {
  const ui = state.get('ui');
  return {
    selectedItems: ui.get('selectedItems'),
    searchText: ui.get('searchText'),
  };
}

export default connect(select)(MealCreator);
