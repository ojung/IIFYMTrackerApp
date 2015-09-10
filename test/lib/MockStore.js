export default class {
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
};
