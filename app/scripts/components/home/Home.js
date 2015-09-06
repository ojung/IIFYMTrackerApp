import Immutable from 'immutable';
import React from 'react';
import {connect} from 'react-redux';
import {
  Card,
  CardHeader,
  CardText,
  CardMedia,
} from 'material-ui';
import moment from 'moment';

import EnergyChart from './EnergyChart';
import EnergyOverview from './EnergyOverview';
import eventsByDaySelector from '../../selectors/home';
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

class Home extends React.Component {
  static propTypes = {
    eventsByDay: React.PropTypes.instanceOf(Immutable.Map)
  }

  render() {
    return (
      <div>
      {this.props.eventsByDay.reduce((prev, events) => {
        const currentIndex = prev.get('index') + 1;
        return Immutable.Map({
          index: currentIndex,
          cards: prev.get('cards').push(getCard(currentIndex, events)),
        });
      }, Immutable.Map({index: 0, cards: Immutable.List()}))
      .get('cards')
      .toArray()
      .reverse()}
      </div>
    );
  }
}

function getCard(index, events) {
  const dateTime = events.first().get('dateTime');
  return (
    <Card key={dateTime.format()} style={{marginTop: '10px'}}>
      <CardHeader title={'Day ' + index}
        subtitle={dateTime.calendar()}
        avatar={<Chart/>}/>
      <CardMedia style={{padding: '10px'}}>
        <EnergyChart data={events}/>
      </CardMedia>
      <CardText>
        <EnergyOverview data={events}/>
      </CardText>
    </Card>
  );
}

export default connect(eventsByDaySelector)(Home);
