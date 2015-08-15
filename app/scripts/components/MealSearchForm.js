import Immutable from 'immutable';
import React from 'react';

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
        <input type="text"
               className="form-control"
               placeholder="Search..."
               onChange={this.handleChange.bind(this)}
               value={this.props.searchText}/>
      </div>
    );
  }
}
