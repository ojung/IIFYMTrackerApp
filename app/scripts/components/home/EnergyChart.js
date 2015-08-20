import React from 'react';
import Immutable from 'immutable';
import {Line} from 'react-chartjs';

export default class extends React.Component {
  static propTypes = {
    data: React.PropTypes.instanceOf(Immutable.List).isRequired
  }

  options = {
    bezierCurve: true,
    bezierCurveTension: 0.3,
    pointDotRadius: 3,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 4,
    datasetFill: true,
  }

  _getData = () => {
    const data = this.props.data.map((event) => {
      return event.get('energyValue');
    })
    .toArray();

    return {
      labels: Immutable.Range(0, 24).toArray(),
      datasets: [{
        data,
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
      }],
    };
  }

  render() {
    return (
      <Line
        data={this._getData()}
        options={this.options}
        style={{width: '100%'}}/>
    );
  }
}
