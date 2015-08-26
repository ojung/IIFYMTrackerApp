import Immutable from 'immutable';

import {searchText, selectedItems} from './meal-creation';
import {
  age,
  height,
  physicalActivityFactor,
  sex,
  weight,
} from './tee-calculation';

const initialState = Immutable.Map({
  ui: Immutable.Map({}),
  data: Immutable.Map({}),
});

export default function(state = initialState, action) {
  return Immutable.Map({
    ui: ui(state.get('ui'), action),
    data: data(state.get('data'), action),
  });
}

function ui(state, action) {
  return Immutable.Map({
    age: age(state.get('age'), action),
    height: height(state.get('height'), action),
    physicalActivityFactor:
      physicalActivityFactor(state.get('physicalActivityFactor'), action),
    searchText: searchText(state.get('searchText'), action),
    selectedItems: selectedItems(state.get('selectedItems'), action),
    sex: sex(state.get('sex'), action),
    weight: weight(state.get('weight'), action),
  });
}

function data(state/*, action*/) {
  return state;
}
