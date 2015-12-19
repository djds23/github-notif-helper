let store = {}

class MockLocalStorage {
  getItem (key) {
    const val = store[key]
    return val ? String(val) : null;
  }

  setItem (key, value) {
    store[key] = String(value);
    return String(value);
  }

  removeItem (key) {
    delete store[key];
  }
}

export default MockLocalStorage;
