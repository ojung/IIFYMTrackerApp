import React from 'react';
import {TextField} from 'material-ui';

export default class extends React.Component {
  static propTypes = {
    onUserInput: React.PropTypes.func,
    searchText: React.PropTypes.string,
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
