import _ from 'lodash';
import Immutable from 'immutable';
import React from 'react';

import MealSearchForm from './MealSearchForm';
import SelectedItems from './SelectedItems';
import FilterableSearchResults from './FilterableSearchResults';

export default class extends React.Component {
  static propTypes = {
    searchResults: React.PropTypes.instanceOf(Immutable.List).isRequired
  }

  constructor(props) {
    super(props);
    const selectedItems = Immutable.Set();
    const searchText = '';
    this.state = {searchText, selectedItems};
  }

  handleUserInput(searchText) {
    this.setState(_.extend({}, this.state, {searchText}));
  }

  removeItem(item) {
    const selectedItems = this.state.selectedItems.subtract([item]);
    this.setState(_.extend({}, this.state, {selectedItems}));
  }

  addItem(item) {
    const selectedItems = this.state.selectedItems.add(item);
    this.setState(_.extend({}, this.state, {selectedItems}));
  }

  render() {
    const filteredResults = this.props.searchResults
      .filter(isNotSelected.bind(null, this.state.selectedItems))
      .filter(matchesSearchText.bind(null, this.state.searchText));

    return (
      <div className="col-md-4">
        <div className="meal-creator panel panel-primary">
          <div className="panel-heading"><h1>MealCreator</h1></div>
          <div className="panel-body">
            <MealSearchForm searchText={this.state.searchText}
                            onUserInput={this.handleUserInput.bind(this)}/>
            <SelectedItems items={this.state.selectedItems}
                           onClick={this.removeItem.bind(this)}/>
            <FilterableSearchResults items={filteredResults}
                                     onClick={this.addItem.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

function matchesSearchText(searchText, result) {
  const regexp = new RegExp(searchText, 'i');
  return searchText === '' || result.get('name').match(regexp);
}

function isNotSelected(selectedItems, result) {
  return !selectedItems.has(result);
}
