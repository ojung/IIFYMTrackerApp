import Kefir from 'kefir';

export default class {
  subscriber = () => {}

  subscribe(subscriber) {
    this.subscriber = subscriber;
  }

  setState(state) {
    this.state = state;
    this.subscriber();
  }

  getState() {
    return this.state;
  }

  eventStream() {
    return Kefir.constant(this.state);
  }
};
