class Link {
  constructor(name) {
    this.name = name;
    this.value = null;
    this.subscribers = [];
  }

  async get() {
    return new Promise((resolve) => {
      this.subscribers.push(resolve);
    });
  }

  set(newValue) {
    this.value = newValue;
    this.subscribers.forEach((resolve) => resolve(newValue));
  }

  destroy() {
    // Remove all subscribers
    this.subscribers = [];
    // Remove reference to value
    this.value = null;
    // Remove reference to name
    this.name = null;
    // Remove link from registry
    delete linkRegistry[this.name];
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
