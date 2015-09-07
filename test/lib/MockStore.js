export default class {
  subscribe(subscriber) {
    this.subscriber = subscriber;
  }

  triggerChange() {
    this.subscriber();
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
};
