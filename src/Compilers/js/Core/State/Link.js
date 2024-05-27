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
    if (this.value !== null) {
      return this.value;
    }

    const links = await loadLinks();
    if (links[this.name] && links[this.name].value !== null) {
      return links[this.name].value;
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
    await this.save();
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

      // Check if all links are null or empty
      const hasLinks = Object.values(links).some(
        (link) => link !== null && link.value !== null
      );

      if (!hasLinks) {
        // If no links are present, delete the JSON file
        await fs.promises.unlink(getFilePath());
      } else {
        // Save the updated links back to the file
        await saveLinks(links);
      }
    } catch (error) {
      console.error('Error while destroying link:', error);
    }
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
  await link.save(); // Save the link when it's created
  return link;
}

// Function to retrieve a link by its name
async function getLink(name) {
  if (linkRegistry[name]) {
    return linkRegistry[name];
  }

  const links = await loadLinks();
  if (links[name]) {
    const link = new Link(name);
    link.value = links[name].value;
    if (links[name].func) {
      link.func = new Function('return ' + links[name].func)();
    }
    linkRegistry[name] = link;
    return link;
  }

  return null;
}

// Function to get the file path for the links JSON file
function getFilePath() {
  // Store the file in the user's project directory as .AlgoTools
  return path.join(process.cwd(), '.AlgoTools', 'links.json');
}

// Function to load links from a JSON file
async function loadLinks() {
  const filePath = getFilePath();
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
  const filePath = getFilePath();
  const data = JSON.stringify(links, null, 2);
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await fs.promises.writeFile(filePath, data, 'utf8');
}

module.exports = { createLink, getLink };
