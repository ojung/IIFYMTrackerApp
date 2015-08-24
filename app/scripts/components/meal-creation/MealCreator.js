import Immutable from 'immutable';
import React from 'react';
import {connect} from 'react-redux';

import FilterableSearchResults from './FilterableSearchResults';
import MealSearchForm from './MealSearchForm';
import SelectedItems from './SelectedItems';
import {
  updateSearchText,
  addItem,
  removeItem,
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
      .filter(isNotSelected.bind(null, selectedItems))
      .filter(matchesSearchText.bind(null, searchText));

    return (
      <div>
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

function matchesSearchText(searchText, result) {
  const regexp = new RegExp(searchText, 'i');
  return searchText === '' || result.get('name').match(regexp);
}

function isNotSelected(selectedItems, result) {
  const name = result.get('name');
  return !selectedItems.find((item) => item.get('name') === name);
}

function select(state) {
  const ui = state.get('ui');
  return {
    selectedItems: ui.get('selectedItems'),
    searchText: ui.get('searchText'),
  };
}

export default connect(select)(MealCreator);
