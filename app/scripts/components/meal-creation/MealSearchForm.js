import React from 'react';
import {TextField} from 'material-ui';

export default class extends React.Component {
  static propTypes = {
    onUserInput: React.PropTypes.func,
    searchText: React.PropTypes.string,
  }

  render() {
    const {onUserInput, searchText} = this.props;
    return (
      <TextField
        type='text'
        hintText='Search...'
        onChange={(event) => onUserInput(event.target.value)}
        style={{width: '100%'}}
        value={searchText}/>
    );
  }
}
