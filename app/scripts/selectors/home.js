import Immutable from 'immutable';
import {createSelectorCreator} from 'reselect';

const immutableCreateSelector = createSelectorCreator(Immutable.is);

const consumptionEventsSelector =
  state => state.get('data').get('consumptionEvents');

const eventsByDaySelector = immutableCreateSelector(
  consumptionEventsSelector,
  consumptionEvents => {
    const eventsByDay = consumptionEvents.groupBy(event => {
      return event.get('dateTime').format('D-M-YYYY');
    });
    return {eventsByDay};
  }
);

export default eventsByDaySelector;
