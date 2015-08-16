import Immutable from 'immutable';
import React from 'react';
import {Glyphicon, ListGroup, ListGroupItem, Panel} from 'react-bootstrap';

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
      const name = item.get('name');
      return (
        <ListGroupItem key={name} onClick={this.handleClick.bind(this, item)}>
          <span>{name}: {item.get('amount')}g</span>
          <Glyphicon glyph="minus" className="pull-right"/>
        </ListGroupItem>
      );
    });

    return (
      <Panel collapsible
             expanded={!this.props.items.isEmpty()}
             header={(<h3>Selected Items</h3>)}>
        <ListGroup>{elements}</ListGroup>
      </Panel>
    );
  }
}
