import React from 'react';
import Router, {Route, RouteHandler} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui from 'material-ui';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import {devTools} from 'redux-devtools';

import Home from './components/home/Home';
import MealCreator from './components/meal-creation/MealCreator';
import Menu from './components/Menu';
import TeeCalculator from './components/tee-calculation/TeeCalculator';
import persist from './persist';
import exposeObservable from './exposeObservable';
import promise from './middlewares/promise';
import rootReducer from './reducers/root-reducer';
import thunk from './middlewares/thunk';

const ThemeManager = new mui.Styles.ThemeManager();
injectTapEventPlugin();

const decoratedCreateStore = compose(
  applyMiddleware(promise, thunk),
  persist(window.localStorage, 'redux',  250),
  exposeObservable,
  devTools(),
)(createStore);
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
    const containerStyle = {
      maxWidth: 800,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    };
    return (
      <div>
        <Menu/>
        <div style={containerStyle}>
          <Provider store={store}>
            {() => <RouteHandler/>}
          </Provider>
        </div>
        {
          <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false}/>
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
