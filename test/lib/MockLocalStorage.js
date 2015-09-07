export default class {
  constructor(items) {
    this.items = items || {};
  }

  setItem(key, item) {
    this.items[key] = item;
  }

  getItem(key) {
    return this.items[key];
  }
};
