import assert from 'assert';

import Immutable from 'immutable';
import nock from 'nock';

import {
  ADD_ITEM,
  RECEIVE_SEARCH_RESULTS,
  REMOVE_ITEM,
  SET_IS_FETCHING,
  STORE_CONSUMPTION_EVENT,
  UPDATE_SEARCHTEXT,
  addItem,
  removeItem,
  updateSearchText,
  storeMeal,
  searchFood,
  setIsFetching,
} from '../../../app/scripts/actions/meal-creation';

describe('meal creation', () => {
  describe('ui actions', () => {
    it('should create an action to add an item', () => {
      const item = 'hello test';
      const expected = {item, type: ADD_ITEM};
      const actual = addItem(item);
      assert.deepEqual(expected, actual);
    });

    it('should create an action to remove an item', () => {
      const item = 'hello test';
      const expected = {item, type: REMOVE_ITEM};
      const actual = removeItem(item);
      assert.deepEqual(expected, actual);
    });

    it('should create an action to set isFetching', () => {
      const isFetching = true;
      const expected = {isFetching, type: SET_IS_FETCHING};
      const actual = setIsFetching(true);
      assert.deepEqual(expected, actual);
    });

    it('should create an action to update the search text', () => {
      const text = 'hello test';
      const expected = {text, type: UPDATE_SEARCHTEXT};
      const actual = updateSearchText(text);
      assert.deepEqual(expected, actual);
    });
  });

  describe('data actions', () => {
    describe('meal creation action', () => {
      it('should dispatch correct actions', () => {
        nock('http://localhost:3000')
          .get('/nutrients/1337')
          .reply(200, foodItem(1337))
          .get('/nutrients/42')
          .reply(200, foodItem(42));

        const expected = [
          {isFetching: true, type: SET_IS_FETCHING},
          {
            foodItems: Immutable.fromJS([
              Object.assign(foodItem(1337), {name: 'beer'}),
              Object.assign(foodItem(42), {name: 'coke'}),
            ]),
            type: STORE_CONSUMPTION_EVENT
          },
          {isFetching: false, type: SET_IS_FETCHING},
        ];

        const inputFoodItems = Immutable.fromJS([
          {name: 'beer', ndbno: 1337},
          {name: 'coke', ndbno: 42},
        ]);

        let actual = [];
        return storeMeal(inputFoodItems)(action => {
          actual = [...actual, action];
        })
        .then(() => {
          assert.equal(actual.length, expected.length,
                       expected.length + ' actions should have been dispatched');
          assert.deepEqual(actual[0], expected[0], 'first action mismatch');
          assert(Immutable.is(actual[1].foodItems, expected[1].foodItems),
                 'second action mismatch');
          assert.deepEqual(actual[2], expected[2], 'third action mismatch');
        });
      });
    });
  });
});

function foodItem(ndbno) {
  return {
    ndbno,
    nutrients: [
      {name: 'energy', value: '110'},
    ],
  };
}
