import Immutable from 'immutable';
import React from 'react';
import {
  List,
  ListItem,
} from 'material-ui';

import Pizza from '../svg-icons/Pizza';
import Run from '../svg-icons/Run';
import Sum from '../svg-icons/Sum';

export default class extends React.Component {
  static propTypes = {
    data: React.PropTypes.instanceOf(Immutable.List)
  }

  _getSum(events, filter) {
    return events
      .map((event) => event.get('energyValue'))
      .filter(filter)
      .reduce((acc, value) => acc + value);
  }

  _getStyle() {
    return {fontFamily: 'Roboto-Light', fontSize: '12px', float: 'right'};
  }

  render() {
    return (
      <List>
        <ListItem
          leftIcon={<Pizza/>}>
          <span>Energy Consumed</span>
          <span style={this._getStyle()}>
            {this._getSum(this.props.data, (a) => a > 0)}
          </span>
        </ListItem>
        <ListItem
          leftIcon={<Run/>}>
          <span>Energy Spent</span>
          <span style={this._getStyle()}>
            {this._getSum(this.props.data, (a) => a < 0)}
          </span>
        </ListItem>
        <ListItem
          leftIcon={<Sum/>}>
          <span>Sum</span>
          <span style={this._getStyle()}>
            {this._getSum(this.props.data, Boolean)}
          </span>
        </ListItem>
      </List>
    );
  }
}
