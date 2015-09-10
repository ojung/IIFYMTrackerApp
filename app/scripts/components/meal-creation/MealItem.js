import React from 'react';
import {Dialog, ListItem, TextField} from 'material-ui';

import {Add} from '../svg-icons/SvgIcons';

export default class extends React.Component {
  static propTypes = {
    itemName: React.PropTypes.string.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    amount: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      amount: props.amount || '',
    };
  }

  _open() {
    this.refs.addOrEditMealDialog.show();
  }

  _close() {
    this.refs.addOrEditMealDialog.dismiss();
  }

  _submit() {
    this._close();
    this.props.handleSubmit(this.state.amount);
  }

  _onChange(event) {
    const newAmount = event.target.value;
    this.setState({...this.state, amount: newAmount});
  }

  render() {
    const actions = [
      {text: 'Cancel', onClick: this._close.bind(this)},
      {text: 'Submit', onClick: this._submit.bind(this)}
    ];

    return (
      <div>
        <ListItem
          primaryText={this.props.itemName}
          onClick={this._open.bind(this)}
          rightIcon={<Add/>}/>
        <Dialog
          title="Add/Edit Item"
          actions={actions}
          modal={true}
          ref="addOrEditMealDialog">
          <TextField
            type="number"
            floatingLabelText="amount"
            onChange={this._onChange.bind(this)}
            style={{width: '100%'}}
            autoFocus/>
        </Dialog>
      </div>
    );
  }
}
