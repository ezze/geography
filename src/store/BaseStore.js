import {
  autorun,
  isObservableProp,
  set,
  toJS
} from 'mobx';

class BaseStore {
  constructor() {
    this.load();
    let initialized = false;
    autorun(() => {
      const data = this.filterObservables(toJS(this));
      if (initialized) {
        this.save(data);
      }
      else {
        console.log(`Store "${this.getKey()}" initialization`);
        console.log(data);
        initialized = true;
      }
    });
  }

  getKey() {
    return this.constructor.name.replace(/Store$/, '').toLowerCase();
  }

  load() {
    const dataItem = localStorage.getItem(this.getKey());
    if (dataItem === null) {
      return;
    }

    try {
      const data = this.filterObservables(JSON.parse(dataItem));
      const names = Object.keys(data);
      names.forEach((name) => {
        set(this, name, data[name]);
      });
    }
    catch (e) {
      console.error(e);
    }
  }

  save(data) {
    try {
      localStorage.setItem(this.getKey(), JSON.stringify(data));
    }
    catch (e) {
      console.error(e);
    }
  }

  filterObservables(data) {
    const filtered = {};
    const names = Object.keys(data);
    names.forEach((name) => {
      if (isObservableProp(this, name)) {
        filtered[name] = data[name];
      }
    });
    return filtered;
  }
}

export default BaseStore;
