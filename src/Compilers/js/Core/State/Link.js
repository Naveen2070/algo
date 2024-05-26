const fs = require('fs');
const path = require('path');

class Link {
  constructor(name) {
    this.name = name;
    this.value = null;
    this.subscribers = [];
    this.func = null; // To store a function
  }

  async get() {
    await loadLinksFromFile();
    if (this.value !== null) {
      return this.value;
    }
    // Create a promise that resolves when the value is set
    return new Promise((resolve) => {
      this.subscribers.push(resolve);
    });
  }

  async set(newValue) {
    this.value = newValue;
    this.subscribers.forEach((resolve) => resolve(newValue));
    this.subscribers = []; // Clear subscribers after setting the value
    await saveLinksToFile();
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
    await saveLinksToFile();
    await checkAndDeleteJsonFile();
  }
}

// Global registry of links
const linkRegistry = {};
const jsonFilePath = path.join(__dirname, 'links.json');

// Function to create and register a new link
async function createLink(name) {
  await loadLinksFromFile();
  if (linkRegistry[name]) {
    console.warn(`Link with name "${name}" already exists.`);
    return linkRegistry[name];
  }
  const link = new Link(name);
  linkRegistry[name] = link;
  await saveLinksToFile();
  return link;
}

// Function to retrieve a link by its name
async function getLink(name) {
  await loadLinksFromFile();
  return linkRegistry[name];
}

// Load links from the JSON file
async function loadLinksFromFile() {
  if (fs.existsSync(jsonFilePath)) {
    const data = await fs.promises.readFile(jsonFilePath, 'utf8');
    const json = JSON.parse(data);
    Object.keys(json).forEach((key) => {
      const link = new Link(key);
      link.value = json[key].value;
      link.func = json[key].func
        ? new Function(`return ${json[key].func}`)()
        : null;
      linkRegistry[key] = link;
    });
  }
}

// Save links to the JSON file
async function saveLinksToFile() {
  const json = {};
  Object.keys(linkRegistry).forEach((key) => {
    json[key] = {
      value: linkRegistry[key].value,
      func: linkRegistry[key].func ? linkRegistry[key].func.toString() : null,
    };
  });
  await fs.promises.writeFile(
    jsonFilePath,
    JSON.stringify(json, null, 2),
    'utf8'
  );
}

// Check and delete the JSON file if it's empty
async function checkAndDeleteJsonFile() {
  if (Object.keys(linkRegistry).length === 0) {
    if (fs.existsSync(jsonFilePath)) {
      await fs.promises.unlink(jsonFilePath);
    }
  }
}

module.exports = { createLink, getLink };
