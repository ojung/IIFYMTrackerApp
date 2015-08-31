import Immutable from 'immutable';
import React from 'react';
import {List, Paper} from 'material-ui';

import MealItem from './MealItem';

export default class extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    items: React.PropTypes.instanceOf(Immutable.Set),
  }

  _handleSubmit(item, amount) {
    const itemWithAmount = item.set('amount', amount);
    this.props.onClick(itemWithAmount);
  }

  render() {
    return (
      <Paper zDepth={1}>
        <List subheader="Search Results">
          {this.props.items.map((item) => {
            const name = item.get('name');
            return (
              <MealItem
                key={name}
                itemName={name}
                handleSubmit={this._handleSubmit.bind(this, item)}/>
            );
          })}
        </List>
      </Paper>
    );
  }
}
