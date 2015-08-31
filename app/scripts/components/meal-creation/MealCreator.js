import Immutable from 'immutable';
import React from 'react';
import {connect} from 'react-redux';

import FilterableSearchResults from './FilterableSearchResults';
import FloatingActionButton from '../FloatingActionButton';
import MealSearchForm from './MealSearchForm';
import SelectedItems from './SelectedItems';
import mealCreationSelector from '../../selectors/meal-creation';
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
    searchResults: React.PropTypes.instanceOf(Immutable.Set),
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

export default connect(mealCreationSelector)(MealCreator);
