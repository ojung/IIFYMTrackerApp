import Immutable from 'immutable';
import React from 'react';
import {AppBar, FlatButton} from 'material-ui';

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
    searchText: '',
    selectedItems: new Immutable.Set(),
  }

  _handleUserInput(searchText) {
    immutableSetState(this, {searchText});
  }

  _removeItem(item) {
    const selectedItems = this.state.selectedItems.subtract([item]);
    immutableSetState(this, {selectedItems});
  }

  _addItem(item) {
    const selectedItems = this.state.selectedItems.add(item);
    immutableSetState(this, {selectedItems});
  }

  render() {
    const filteredResults = SEARCHRESULTS
      .filter(isNotSelected.bind(null, this.state.selectedItems))
      .filter(matchesSearchText.bind(null, this.state.searchText));

    return (
      <div>
        <AppBar
          title="MealCreator"
          iconElementRight={<FlatButton label="Save"/>}/>
        <MealSearchForm
          searchText={this.state.searchText}
          onUserInput={this._handleUserInput.bind(this)}/>
        <SelectedItems
          items={this.state.selectedItems}
          onClick={this._removeItem.bind(this)}/>
        <FilterableSearchResults
          items={filteredResults}
          onClick={this._addItem.bind(this)}/>
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
