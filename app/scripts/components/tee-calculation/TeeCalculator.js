import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {
  DropDownMenu,
  RadioButton,
  RadioButtonGroup,
  TextField,
} from 'material-ui';

import {
  updateHeight,
  updateWeight,
  updateSex,
  updateAge,
  updatePhysicalActivityFactor,
} from '../../actions/tee-calculation';

const menuItems = [
  {payload: 1.15, text: 'Extremly Inactive'},
  {payload: 1.3, text: 'Sedentary'},
  {payload: 1.6, text: 'Moderatly Active'},
  {payload: 2.05, text: 'Vigorously Active'},
];

//TODO: Save selected item for sex and paf
class TeeCalculator extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    weight: React.PropTypes.number,
    height: React.PropTypes.number,
    age: React.PropTypes.number,
    sex: React.PropTypes.string,
    pyhsicalActivityFactor: React.PropTypes.number,
  }

  _getResult = () => {
    const data = this.props;
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
    const {dispatch, age, weight, height} = this.props;
    return (
      <div>
        <div style={{padding: '15px'}}>
          <TextField
            type='number'
            floatingLabelText='Weight'
            hintText='Enter your Weight in kg'
            onChange={(event) => dispatch(updateWeight(event.target.value))}
            style={{width: '100%'}}
            value={weight}/>
          <TextField
            type='number'
            floatingLabelText='Height'
            hintText='Enter your Height in cm'
            onChange={(event) => dispatch(updateHeight(event.target.value))}
            style={{width: '100%'}}
            value={height}/>
          <TextField
            type='number'
            floatingLabelText='Age'
            hintText='Enter your Age in Years'
            onChange={(event) => dispatch(updateAge(event.target.value))}
            style={{width: '100%'}}
            value={age}/>
          <h4>Sex</h4>
          <RadioButtonGroup
            name="sex"
            onChange={(_e, item) => dispatch(updateSex(item))}>
            <RadioButton value="male" label="Male"/>
            <RadioButton value="female" label="Female"/>
          </RadioButtonGroup>
          <h4>Activity Level</h4>
          <DropDownMenu
            menuItems={menuItems}
            onChange={(_e, _b, item) =>
              dispatch(updatePhysicalActivityFactor(item.payload))}/>
          <h4>Your Total Energy Expenditure: {this._getResult()}</h4>
        </div>
      </div>
    );
  }
}

function select(state) {
  const ui = state.get('ui');
  return {
    age: ui.get('age'),
    height: ui.get('height'),
    physicalActivityFactor: ui.get('physicalActivityFactor'),
    sex: ui.get('sex'),
    weight: ui.get('weight'),
  };
}

export default connect(select)(TeeCalculator);
