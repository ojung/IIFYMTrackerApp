import Immutable from 'immutable';
import React from 'react';
import {LinearProgress} from 'material-ui';
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
    isCached: React.PropTypes.bool.isRequired,
    selectedItems: React.PropTypes.instanceOf(Immutable.Set).isRequired,
    searchResults: React.PropTypes.instanceOf(Immutable.Set).isRequired,
  }

  componentDidUpdate() {
    const {dispatch, isCached, searchText} = this.props;

    if (searchText.length <= 3 || isCached) {
      return;
    }

    dispatch(searchFood(searchText.trim()));
  }

  render() {
    const {
      isFetching,
      dispatch,
      searchResults,
      searchText,
      selectedItems,
    } = this.props;

    const selectedItemsElement = (
      <SelectedItems
        items={selectedItems}
        onClick={(item) => dispatch(removeItem(item))}/>
    );

    return (
      <div>
        {isFetching ? <LinearProgress mode="indeterminate"/> : <div/>}
        <FloatingActionButton onClick={() =>
          dispatch(storeConsumptionEvent(selectedItems))}/>
        <MealSearchForm
          searchText={searchText}
          onUserInput={(text) => dispatch(updateSearchText(text))}/>
        {(selectedItems.size > 0) ? selectedItemsElement : <div/>}
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
