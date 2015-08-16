import Immutable from 'immutable';
import React from 'react';
import {ListGroup, Panel} from 'react-bootstrap';

import MealItem from './MealItem';

export default class extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    items: React.PropTypes.instanceOf(Immutable.List),
  }

  _handleSubmit(item, amount) {
    const itemWithAmount = item.set('amount', amount);
    this.props.onClick(itemWithAmount);
  }

  render() {
    const elements = this.props.items.map((item) => {
      const name = item.get('name');
      return (
          <MealItem
            key={name}
            itemName={name}
            handleSubmit={this._handleSubmit.bind(this, item)}/>
      );
    });

    return (
      <Panel header={(<h3>Search Results</h3>)}>
        <ListGroup>{elements}</ListGroup>
      </Panel>
    );
  }
}
