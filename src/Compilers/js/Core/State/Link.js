class Link {
  constructor(name) {
    this.name = name;
    this.value = null;
    this.subscribers = [];
    this.func = null; // To store a function
  }

  get() {
    if (this.value !== null) {
      return this.value;
    }
    // Create a promise that resolves when the value is set
    return new Promise((resolve) => {
      this.subscribers.push(resolve);
    });
  }

  set(newValue) {
    this.value = newValue;
    this.subscribers.forEach((resolve) => resolve(newValue));
    this.subscribers = []; // Clear subscribers after setting the value
  }

  storeFunction(func) {
    if (typeof func === 'function') {
      this.func = func;
    } else {
      console.error('storeFunction expects a function.');
    }
  }

  executeStoredFunction() {
    if (typeof this.func === 'function') {
      return this.func();
    } else {
      console.error('No function stored in this Link object.');
    }
  }

  destroy() {
    // Remove all subscribers
    this.subscribers = [];
    // Remove reference to value
    this.value = null;
    // Remove link from registry
    delete linkRegistry[this.name];
    // Remove reference to name
    this.name = null;
    this.func = null; // Remove reference to the stored function
  }
}

// Global registry of links
const linkRegistry = {};

// Function to create and register a new link
function createLink(name) {
  if (linkRegistry[name]) {
    console.warn(`Link with name "${name}" already exists.`);
    return linkRegistry[name];
  }
  const link = new Link(name);
  linkRegistry[name] = link;
  return link;
}

// Function to retrieve a link by its name
function getLink(name) {
  return linkRegistry[name];
}

module.exports = { createLink, getLink };
