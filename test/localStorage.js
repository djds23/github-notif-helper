import simple from 'simple-mock';

class MockLocalStorage {
  constructor () {
    this.store = {}

    this.getItem = simple.spy((key) => {
      const val = this.store[String(key)]
      return val ? String(val) : null;
    });

    this.setItem = simple.spy((key, value) => {
      this.store[String(key)] = String(value);
      return String(value);
    });

    this.remoteItem = simple.spy((key) => {
      delete this.store[key];
    });
  }
}

export default MockLocalStorage;

