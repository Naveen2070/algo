const fs = require('fs');
const path = require('path');

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

  async save() {
    const links = await loadLinks();
    links[this.name] = {
      value: this.value,
      func: this.func ? this.func.toString() : null,
    };
    await saveLinks(links);
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

  async destroy() {
    // Remove all subscribers
    this.subscribers = [];
    // Remove reference to value
    this.value = null;
    // Remove link from registry
    delete linkRegistry[this.name];
    // Remove reference to name
    this.name = null;
    this.func = null; // Remove reference to the stored function

    try {
      // Load links from JSON file
      const links = await loadLinks();

      // Remove the link from the loaded links
      delete links[this.name];

      // Save the updated links back to the file
      await saveLinks(links);
    } catch (error) {
      console.error('Error while destroying link:', error);
    }
  }
}

// Global registry of links
const linkRegistry = {};

// Function to create and register a new link
async function createLink(name) {
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

// Function to load links from a JSON file
async function loadLinks() {
  const filePath = path.join(__dirname, 'links.json');
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File does not exist, return an empty object
      return {};
    }
    throw error;
  }
}

// Function to save links to a JSON file
async function saveLinks(links) {
  const filePath = path.join(__dirname, 'links.json');
  const data = JSON.stringify(links, null, 2);
  await fs.promises.writeFile(filePath, data, 'utf8');
}

module.exports = { createLink, getLink };
