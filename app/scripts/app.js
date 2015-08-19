import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui from 'material-ui';

//import MealCreator from './components/meal-creation/MealCreator';
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
    //return <MealCreator/>
    return <TeeCalculator/>;
  }
}

ParentComponent.childContextTypes = {
  muiTheme: React.PropTypes.object
};

const mountNode = document.getElementById('app');
React.render(<ParentComponent/>, mountNode);
