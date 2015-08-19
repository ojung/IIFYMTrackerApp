import React from 'react';
import Router, {Route, RouteHandler} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui from 'material-ui';

import MealCreator from './components/meal-creation/MealCreator';
import TeeCalculator from './components/tee-calculation/TeeCalculator';

const ThemeManager = new mui.Styles.ThemeManager();

window.React = React;

injectTapEventPlugin();

class App extends React.Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    return <RouteHandler/>;
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

const routes = (
  <Route handler={App}>
    <Route path="meal-creator" handler={MealCreator}/>
    <Route path="tee-calculator" handler={TeeCalculator}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
