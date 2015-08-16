import _ from 'lodash';
import React from 'react';
import {Button, Glyphicon, Input, ListGroupItem, Modal} from 'react-bootstrap';

export default class extends React.Component {
  static propTypes = {
    itemName: React.PropTypes.string.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    amount: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      amount: props.amount || '',
    };
  }

  _close() {
    this.setState(_.extend({}, this.state, {showModal: false}))
  }

  _open() {
    this.setState(_.extend({}, this.state, {showModal: true}))
  }

  _submit() {
    this.props.handleSubmit(this.state.amount);
    this.setState(_.extend({}, this.state, {showModal: false}))
  }

  _onChange(event) {
    const newAmount = event.target.value;
    this.setState(_.extend({}, this.state, {amount: newAmount}));
  }

  _onKeyPress(event) {
    const enterKeyCode = 13;
    if (event.which === enterKeyCode) {
      this._submit.call(this);
    }
  }

  render() {
    return (
      <ListGroupItem onClick={this._open.bind(this)}>
        <span>{this.props.itemName}</span>
        <Glyphicon glyph="plus" className="pull-right"/>
        <Modal
          show={this.state.showModal}
          onHide={this._close.bind(this)}
          onKeyPress={this._onKeyPress.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add/Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.props.itemName}</h4>
            <Input
              type='number'
              onChange={this._onChange.bind(this)}
              value={this.state.amount}
              addonAfter="g"
              addonBefore="amount"
              autoFocus/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._close.bind(this)}>Cancel</Button>
            <Button onClick={this._submit.bind(this)}>Add</Button>
          </Modal.Footer>
        </Modal>
      </ListGroupItem>
    );
  }
}
