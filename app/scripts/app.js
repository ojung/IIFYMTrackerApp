//import Immutable from 'immutable';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui from 'material-ui';

//import MealCreator from './components/MealCreator';
import TeeCalculator from './components/tee-calculation/TeeCalculator';

const ThemeManager = new mui.Styles.ThemeManager();

window.React = React;

injectTapEventPlugin();

class ParentComponent extends React.Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    return <TeeCalculator/>;
  }
}

ParentComponent.childContextTypes = {
  muiTheme: React.PropTypes.object
};

const mountNode = document.getElementById('app');
React.render(<ParentComponent/>, mountNode);

//const SEARCHRESULTS = Immutable.fromJS([
  //{name: 'Potatoes'},
  //{name: 'Chicken Breast'},
  //{name: 'Brussel Sprouts'},
  //{name: 'Beef'},
  //{name: 'Doener Kebab'},
  //{name: 'Falafel'},
  //{name: 'Schawarma'},
  //{name: 'Kumpir'},
  //{name: 'Burger'},
  //{name: 'Nudelz'},
  //{name: 'Capsicum'},
  //{name: 'Zuckerpo'},
  //{name: 'Cadbury'},
  //{name: 'Malteser'},
  //{name: 'Pizza'}
//], (key, value) => {
  //const isIndexed = Immutable.Iterable.isIndexed(value);
  //return isIndexed ? value.toList() : value.toOrderedMap();
//});
