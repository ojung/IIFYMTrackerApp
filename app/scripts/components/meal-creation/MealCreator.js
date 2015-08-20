import Immutable from 'immutable';
import React from 'react';

import FilterableSearchResults from './FilterableSearchResults';
import MealSearchForm from './MealSearchForm';
import SelectedItems from './SelectedItems';
import immutableSetState from '../../common/immutableSetState';

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

export default class extends React.Component {
  state = {
    data: Immutable.Map({
      searchText: '',
      selectedItems: new Immutable.Set(),
    })
  }

  _handleUserInput = (searchText) => {
    immutableSetState(this, (data) => data.set('searchText', searchText));
  }

  _removeItem = (item) => {
    const selectedItems = this.state.data.get('selectedItems').subtract([item]);
    immutableSetState(this, (data) => data.set('selectedItems', selectedItems));
  }

  _addItem = (item) => {
    const selectedItems = this.state.data.get('selectedItems').add(item);
    immutableSetState(this, (data) => {
      return data.set('selectedItems', selectedItems).set('searchText', '');
    });
  }

  render() {
    const filteredResults = SEARCHRESULTS
      .filter(isNotSelected.bind(null, this.state.data.get('selectedItems')))
      .filter(matchesSearchText.bind(null, this.state.data.get('searchText')));

    return (
      <div>
        <MealSearchForm
          searchText={this.state.data.get('searchText')}
          onUserInput={this._handleUserInput}/>
        <SelectedItems
          items={this.state.data.get('selectedItems')}
          onClick={this._removeItem}/>
        <FilterableSearchResults
          items={filteredResults}
          onClick={this._addItem}/>
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
