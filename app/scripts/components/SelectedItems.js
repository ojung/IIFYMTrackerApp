import Immutable from 'immutable';
import React from 'react';

export default class extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    items: React.PropTypes.instanceOf(Immutable.Set)
  }

  handleClick(item) {
    this.props.onClick(item);
  }

  render() {
    const elements = this.props.items.map((item) => {
      return (
        <li key={item.get('name')} className="list-group-item"
                                   onClick={this.handleClick.bind(this, item)}>
          <span>{item.get('name')}: {item.get('amount')}g </span>
          <i className="glyphicon glyphicon-minus pull-right"></i>
        </li>
      );
    });

    return (
      <div className="meal-selected-items">
        <h3>Selected Items</h3>
        <ul className="list-group">
        {elements}
        </ul>
      </div>
    );
  }
}
