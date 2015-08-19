import _ from 'lodash';
import React from 'react';
import {AppBar, DropDownMenu, Paper, TextField, RadioButtonGroup, RadioButton} from 'material-ui';

export default class extends React.Component {
  state = {}

  _handleTextFieldChange = (field, event) => {
    const newState = _.extend({}, this.state);
    newState[field] = event.target.value;
    this.setState(newState);
  }

  _handleActivityLevelChange = (_event, _selectedIndex, menuItem) => {
    this.setState(_.extend({}, this.state, {
      physicalActivityFactor: menuItem.payload
    }));
  }

  _handleGenderChange = (_event, selectedItem) => {
    this.setState(_.extend({}, this.state, {gender: selectedItem}));
  }

  _getResult = () => {
    if (_(this.state).size() <= 4) {
      return 0;
    }

    const {weight, height, age, gender, physicalActivityFactor} = this.state;
    const genderParameter = {none: 83, female: -161, male: 5}[gender];
    const restingEnergyExpenditure =
      (10 * weight + 6.25 * height - 5 * age + genderParameter);

    return Math.floor(restingEnergyExpenditure * physicalActivityFactor);
  }

  render() {
    return (
      <div>
        <AppBar title="TeeCalculator"/>
        <Paper zDepth={1} style={{padding: '10px'}}>
          <TextField
            type='number'
            floatingLabelText='Weight'
            hintText='Enter your Weight in kg'
            onChange={this._handleTextFieldChange.bind(this, 'weight')}
            style={{width: '90%'}}
            value={this.state.weight}/>
          <TextField
            type='number'
            floatingLabelText='Height'
            hintText='Enter your Height in cm'
            onChange={this._handleTextFieldChange.bind(this, 'height')}
            style={{width: '90%'}}
            value={this.state.height}/>
          <TextField
            type='number'
            floatingLabelText='Age'
            hintText='Enter your Age in Years'
            onChange={this._handleTextFieldChange.bind(this, 'age')}
            style={{width: '90%'}}
            value={this.state.age}/>
          <h4>Gender</h4>
          <RadioButtonGroup name="gender" onChange={this._handleGenderChange}>
            <RadioButton value="male" label="Male"/>
            <RadioButton value="female" label="Femal"/>
            <RadioButton value="none" label="Inbetween"/>
          </RadioButtonGroup>
          <h4>Activity Level</h4>
          <DropDownMenu
            menuItems={menuItems}
            onChange={this._handleActivityLevelChange}/>
          <h4>Your Total Energy Expenditure: {this._getResult()}</h4>
        </Paper>
      </div>
    );
  }
}

const menuItems = [
  {payload: 1.15, text: 'Extremly Inactive'},
  {payload: 1.3, text: 'Sedentary'},
  {payload: 1.6, text: 'Moderatly Active'},
  {payload: 2.05, text: 'Vigorously Active'},
];
