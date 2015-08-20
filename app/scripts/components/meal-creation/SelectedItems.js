import Immutable from 'immutable';
import React from 'react';
import {List, ListItem, Paper} from 'material-ui';

import {Remove} from '../svg-icons/SvgIcons';

export default class extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    items: React.PropTypes.instanceOf(Immutable.Set),
  }

  _handleClick(item) {
    this.props.onClick(item);
  }

  render() {
    return (
      <Paper zDepth={1}>
        <List subheader="Selected Items">
          {this.props.items.map((item) => {
            const name = item.get('name');
            return (
              <ListItem
                key={name}
                onClick={this._handleClick.bind(this, item)}
                rightIcon={<Remove/>}>
                <span>{name}</span>
                <span style={{
                  fontFamily: 'Roboto-Light',
                  fontSize: '12px',
                  float: 'right'
                }}>{item.get('amount')}g</span>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  }
}
