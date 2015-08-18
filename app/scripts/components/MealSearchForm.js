import Immutable from 'immutable';
import React from 'react';
import {Paper, TextField} from 'material-ui';

export default class extends React.Component {
  static propTypes = {
    items: React.PropTypes.instanceOf(Immutable.List)
  }

  _handleChange(event) {
    this.props.onUserInput(event.target.value);
  }

  render() {
    return (
      <TextField
        type='text'
        hintText='Search...'
        onChange={this._handleChange.bind(this)}
        style={{width: '100%'}}
        value={this.props.searchText}/>
    );
  }
}
