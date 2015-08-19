import _ from 'lodash';
import React from 'react';
import {
  AppBar,
  DropDownMenu,
  Paper,
  RadioButton,
  RadioButtonGroup,
  TextField,
} from 'material-ui';

import immutableSetState from '../../common/immutableSetState';

export default class extends React.Component {
  static propTypes = {
    initialWeight: React.PropTypes.number,
    initialHeight: React.PropTypes.number,
    initialAge: React.PropTypes.number,
    initialSex: React.PropTypes.string,
    initialPyhsicalActivityFactor: React.PropTypes.number,
  }

  state = {
    weight: this.props.intialWeight,
    height: this.props.intialHeight,
    age: this.props.intialAge,
    sex: this.props.intialSex,
    physicalActivityFactor: this.props.intialPhysicalActivityFactor,
  }

  _handleTextFieldChange = (field, event) => {
    const newState = _.extend({}, this.state);
    newState[field] = event.target.value;
    this.setState(newState);
  }

  _handleActivityLevelChange = (_event, _selectedIndex, menuItem) => {
    immutableSetState(this, {physicalActivityFactor: menuItem.payload});
  }

  _handleSexChange = (_event, selectedItem) => {
    immutableSetState(this, {sex: selectedItem});
  }

  _getResult = () => {
    if (!_(this.state).values().all(Boolean)) {
      return '';
    }

    const {weight, height, age, sex, physicalActivityFactor} = this.state;
    const sexParameter = {female: -161, male: 5}[sex];
    const restingEnergyExpenditure =
      (10 * weight + 6.25 * height - 5 * age + sexParameter);

    return Math.floor(restingEnergyExpenditure * physicalActivityFactor);
  }

  render() {
    return (
      <div>
        <AppBar title="TeeCalculator"/>
        <Paper zDepth={1} style={{padding: '10px', marginTop: '10px'}}>
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
