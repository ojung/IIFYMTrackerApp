import Immutable from 'immutable';
import React from 'react';

export default class extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    items: React.PropTypes.instanceOf(Immutable.List)
  }

  handleClick(item) {
    this.props.onClick(item);
  }

  render() {
    const elements = this.props.items.map((item) => {
      return (
        <li key={item.get('name')} className="list-group-item"
                                   onClick={this.handleClick.bind(this, item)}>
          <span>{item.get('name')} </span>
          <i className="glyphicon glyphicon-plus pull-right"></i>
        </li>
      );
    });
    return (
      <div className="filterable-search-results">
        <h3>Search Results</h3>
        <ul className="list-group"> {elements} </ul>
      </div>
    );
  }
}
