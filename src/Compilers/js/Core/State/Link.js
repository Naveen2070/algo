class Link {
  constructor(name) {
    this.name = name;
    this.value = null;
    this.subscribers = [];
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

  destroy() {
    // Remove all subscribers
    this.subscribers = [];
    // Remove reference to value
    this.value = null;
    // Remove link from registry
    delete linkRegistry[this.name];
    // Remove reference to name
    this.name = null;
  }
}

// Global registry of links
const linkRegistry = {};

// Function to create and register a new link
function createLink(name) {
  const link = new Link(name);
  linkRegistry[name] = link;
  return link;
}

// Function to retrieve a link by its name
function getLink(name) {
  return linkRegistry[name];
}

module.exports = { createLink, getLink };
