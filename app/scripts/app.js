import Immutable from 'immutable';
import React from 'react';

import MealCreator from './components/MealCreator';

window.React = React;
const mountNode = document.getElementById('app');

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
  {name: 'Pizza'}
], (key, value) => {
  const isIndexed = Immutable.Iterable.isIndexed(value);
  return isIndexed ? value.toList() : value.toOrderedMap();
});

React.render(<MealCreator searchResults={SEARCHRESULTS}/>, mountNode);
