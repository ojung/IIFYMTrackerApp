import _ from 'lodash';
import Immutable from 'immutable';
import React from 'react';
import {
  DropDownMenu,
  RadioButton,
  RadioButtonGroup,
  TextField,
} from 'material-ui';

import immutableSetState from '../../common/immutableSetState';

const menuItems = [
  {payload: 1.15, text: 'Extremly Inactive'},
  {payload: 1.3, text: 'Sedentary'},
  {payload: 1.6, text: 'Moderatly Active'},
  {payload: 2.05, text: 'Vigorously Active'},
];

export default class extends React.Component {
  static propTypes = {
    initialWeight: React.PropTypes.number,
    initialHeight: React.PropTypes.number,
    initialAge: React.PropTypes.number,
    initialSex: React.PropTypes.string,
    initialPyhsicalActivityFactor: React.PropTypes.number,
  }

  state = {
    data: Immutable.Map({
      weight: this.props.intialWeight,
      height: this.props.intialHeight,
      age: this.props.intialAge,
      sex: this.props.intialSex,
      physicalActivityFactor: this.props.intialPhysicalActivityFactor,
    })
  }

  _handleTextFieldChange(field, event) {
    const newValue = event.target.value;
    immutableSetState(this, (data) => data.set(field, newValue));
  }

  _handleActivityLevelChange = (_event, _selectedIndex, menuItem) => {
    const physicalActivityFactor = menuItem.payload;
    immutableSetState(this, (data) => {
      return data.set('physicalActivityFactor', physicalActivityFactor);
    });
  }

  _handleSexChange = (_event, selectedItem) => {
    immutableSetState(this, (data) => data.set('sex', selectedItem));
  }

  _getResult = () => {
    const data = this.state.data.toObject();

    if (!_(data).values().all(Boolean)) {
      return '';
    }

    const {weight, height, age, sex, physicalActivityFactor} = data;
    const sexParameter = {female: -161, male: 5}[sex];
    const restingEnergyExpenditure =
      (10 * weight + 6.25 * height - 5 * age + sexParameter);

    return Math.floor(restingEnergyExpenditure * physicalActivityFactor);
  }

  render() {
    return (
      <div>
        <div style={{padding: '15px'}}>
          <TextField
            type='number'
            floatingLabelText='Weight'
            hintText='Enter your Weight in kg'
            ref="weight"
            onChange={this._handleTextFieldChange.bind(this, 'weight')}
            style={{width: '100%'}}
            value={this.state.data.get('weight')}/>
          <TextField
            type='number'
            floatingLabelText='Height'
            hintText='Enter your Height in cm'
            ref="height"
            onChange={this._handleTextFieldChange.bind(this, 'height')}
            style={{width: '100%'}}
            value={this.state.data.get('height')}/>
          <TextField
            type='number'
            floatingLabelText='Age'
            hintText='Enter your Age in Years'
            ref="age"
            onChange={this._handleTextFieldChange.bind(this, 'age')}
            style={{width: '100%'}}
            value={this.state.data.get('age')}/>
          <h4>Sex</h4>
          <RadioButtonGroup name="sex" onChange={this._handleSexChange}>
            <RadioButton value="male" label="Male"/>
            <RadioButton value="female" label="Female"/>
          </RadioButtonGroup>
          <h4>Activity Level</h4>
          <DropDownMenu
            menuItems={menuItems}
            onChange={this._handleActivityLevelChange}/>
          <h4>Your Total Energy Expenditure: {this._getResult()}</h4>
        </div>
      </div>
    );
  }
}
