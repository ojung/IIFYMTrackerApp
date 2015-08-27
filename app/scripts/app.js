import React from 'react';
import Router, {Route, RouteHandler} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui from 'material-ui';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import {Provider} from 'react-redux';
import {compose, createStore} from 'redux';
import {devTools, persistState} from 'redux-devtools';

import Home from './components/home/Home';
import MealCreator from './components/meal-creation/MealCreator';
import Menu from './components/Menu';
import TeeCalculator from './components/tee-calculation/TeeCalculator';
import rootReducer from './reducers/root-reducer';

const ThemeManager = new mui.Styles.ThemeManager();

injectTapEventPlugin();

const decoratedCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);
const store = decoratedCreateStore(rootReducer);

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
        {
          <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor}/>
          </DebugPanel>
        }
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
