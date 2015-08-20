import Immutable from 'immutable';
import React from 'react';
import {
  Card,
  CardHeader,
  CardText,
  CardMedia,
} from 'material-ui';
import moment from 'moment';

import EnergyChart from './EnergyChart';
import EnergyOverview from './EnergyOverview';
import {Chart} from '../svg-icons/SvgIcons';

moment.locale('nz', {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[last] dddd',
    sameElse: 'L'
  }
});

const NUM_DAYS = 5;
const days = Immutable.Range(1, NUM_DAYS + 1).map((d) => {
  const date =
    moment().startOf('day').subtract(NUM_DAYS + 1, 'days').add(d, 'days');

  const events = Immutable.Range(0, 24).map((h) => {
    const energyValue = Math.floor((Math.random() * 500) - 200);
    const time = date.add(h, 'hours');
    return Immutable.Map({energyValue, time});
  })
  .map((event) => (Math.random() > 0.71) ? event : event.set('energyValue', 0))
  .toList();

  return Immutable.Map({date, events});
});

export default class extends React.Component {
  static propTypes = {
    days: React.PropTypes.instanceOf(Immutable.List)
  }

  render() {
    return (
      <div>
      {days.map((day, index) => {
        return (
          <Card key={day.get('date').format()} style={{marginTop: '10px'}}>
            <CardHeader title={'Day ' + index}
              subtitle={day.get('date').calendar()}
              avatar={<Chart/>}/>
            <CardMedia style={{padding: '10px'}}>
              <EnergyChart data={day.get('events')}/>
            </CardMedia>
            <CardText>
              <EnergyOverview data={day.get('events')}/>
            </CardText>
          </Card>
        );
      }).toArray().reverse()}
      </div>
    );
  }
}
