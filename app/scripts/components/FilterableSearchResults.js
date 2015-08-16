import Immutable from 'immutable';
import React from 'react';
import {Glyphicon, ListGroup, ListGroupItem, Panel} from 'react-bootstrap';

export default class extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    items: React.PropTypes.instanceOf(Immutable.List)
  }

  handleClick(item) {
    this.props.onClick(item);
  }

  // TODO: create SearchResult subcomponent containing the ListGroupItem
  // or <span> and the hidden modal. This component will be responsible for
  // holding the visibility state of the modal and calling back the parent
  // (this) to report any changes in the amount number input
  render() {
    const elements = this.props.items.map((item) => {
      const name = item.get('name');
      return (
        <ListGroupItem key={name} onClick={this.handleClick.bind(this, item)}>
          <span>{name} </span><Glyphicon glyph="plus" className="pull-right"/>
        </ListGroupItem>
      );
    });

    return (
      <Panel header={(<h3>Search Results</h3>)}>
        <ListGroup>{elements}</ListGroup>
      </Panel>
    );
  }
}
