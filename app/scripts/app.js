import React from 'react';
import Router, {Route, RouteHandler} from 'react-router';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui from 'material-ui';

import Home from './components/home/Home';
import MealCreator from './components/meal-creation/MealCreator';
import Menu from './components/Menu';
import TeeCalculator from './components/tee-calculation/TeeCalculator';
import {mealCreation} from './reducers/meal-creation';

const ThemeManager = new mui.Styles.ThemeManager();

injectTapEventPlugin();

const store = createStore(mealCreation);

class App extends React.Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    return (
      <div>
        <Menu/>
        <Provider store={store}>
          {() => <RouteHandler/>}
        </Provider>
      </div>
    );
  }
}

const routes = (
  <Route handler={App}>
    <Route path="meal-creator" handler={MealCreator}/>
    <Route path="tee-calculator" handler={TeeCalculator}/>
    <Route path="home" handler={Home}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
