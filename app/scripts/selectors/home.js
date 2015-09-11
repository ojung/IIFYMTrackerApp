import Immutable from 'immutable';
import moment from 'moment';
import {createSelectorCreator} from 'reselect';

const immutableCreateSelector = createSelectorCreator(Immutable.is);

const consumptionEventsSelector =
  state => state.get('data').get('consumptionEvents');

const rehydratedEventsSelector = immutableCreateSelector(
  consumptionEventsSelector,
  consumptionEvents => {
    return consumptionEvents.map(event => {
      return event.set('dateTime', moment(event.get('dateTime')));
    });
  }
);

const eventsByDaySelector = immutableCreateSelector(
  rehydratedEventsSelector,
  rehydratedEvents => {
    const eventsByDay = rehydratedEvents.groupBy(event => {
      return event.get('dateTime').format('D-M-YYYY');
    });
    return {eventsByDay};
  }
);

export default eventsByDaySelector;
