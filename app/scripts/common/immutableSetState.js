import _ from 'lodash';

export default function(context, newState) {
  context.setState(_.extend({}, context.state, newState));
}
