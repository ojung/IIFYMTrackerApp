import Immutable from 'immutable';
import React from 'react';
import {Input} from 'react-bootstrap';

export default class extends React.Component {
  static propTypes = {
    items: React.PropTypes.instanceOf(Immutable.List)
  }

  handleChange(event) {
    this.props.onUserInput(event.target.value);
  }

  render() {
    return (
      <div className="meal-search-form">
        <Input type='text'
               placeholder='Search...'
               onChange={this.handleChange.bind(this)}
               value={this.props.searchText}/>
      </div>
    );
  }
}
