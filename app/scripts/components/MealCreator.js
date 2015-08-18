import _ from 'lodash';
import Immutable from 'immutable';
import React from 'react';
import {AppBar, FlatButton} from 'material-ui';

import FilterableSearchResults from './FilterableSearchResults';
import MealSearchForm from './MealSearchForm';
import SelectedItems from './SelectedItems';

export default class extends React.Component {
  static propTypes = {
    searchResults: React.PropTypes.instanceOf(Immutable.List).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selectedItems: new Immutable.Set(),
    };
  }

  _handleUserInput(searchText) {
    this.setState(_.extend({}, this.state, {searchText}));
  }

  _removeItem(item) {
    const selectedItems = this.state.selectedItems.subtract([item]);
    this.setState(_.extend({}, this.state, {selectedItems}));
  }

  _addItem(item) {
    const selectedItems = this.state.selectedItems.add(item);
    this.setState(_.extend({}, this.state, {selectedItems}));
  }

  render() {
    const filteredResults = this.props.searchResults
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
