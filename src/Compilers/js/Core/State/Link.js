const fs = require('fs');
const path = require('path');

class Link {
  constructor(name) {
    this.name = name;
    this.value = null;
    this.subscribers = [];
  }

  async get() {
    if (this.value !== null) {
      return this.resolveValue();
    }

    const links = await loadLinks();
    if (links[this.name] && links[this.name].value !== null) {
      this.value = links[this.name].value;
      return this.resolveValue();
    }

    // Create a promise that resolves when the value is set
    return new Promise((resolve) => {
      this.subscribers.push(resolve);
    });
  }

  async set(newValue) {
    this.value = newValue;
    this.subscribers.forEach((resolve) => resolve(this.resolveValue()));
    this.subscribers = []; // Clear subscribers after setting the value
    await this.save();
  }

  async save() {
    const links = await loadLinks();
    links[this.name] = {
      value: this.serializeValue(),
    };
    await saveLinks(links);
  }

  resolveValue() {
    if (typeof this.value === 'string' && this.value.startsWith('function:')) {
      const funcString = this.value.slice(9);
      return new Function('return ' + funcString)();
    }
    return this.value;
  }

  serializeValue() {
    if (typeof this.value === 'function') {
      return 'function:' + this.value.toString();
    }
    return this.value;
  }

  async destroy() {
    this.subscribers = [];
    this.value = null;
    delete linkRegistry[this.name];
    this.name = null;

    try {
      const links = await loadLinks();
      delete links[this.name];

      const hasLinks = Object.values(links).some(
        (link) => link !== null && link.value !== null
      );

      if (!hasLinks) {
        await fs.promises.unlink(getFilePath());
      } else {
        await saveLinks(links);
      }
    } catch (error) {
      console.error('Error while destroying link:', error);
    }
  }
}

// Global registry of links
const linkRegistry = {};

async function createLink(name) {
  if (linkRegistry[name]) {
    console.warn(`Link with name "${name}" already exists.`);
    return linkRegistry[name];
  }
  const link = new Link(name);
  linkRegistry[name] = link;
  await link.save(); // Save the link when it's created
  return link;
}

async function getLink(name) {
  if (linkRegistry[name]) {
    return linkRegistry[name];
  }

  const links = await loadLinks();
  if (links[name]) {
    const link = new Link(name);
    link.value = links[name].value;
    linkRegistry[name] = link;
    return link;
  }

  return null;
}

function getFilePath() {
  return path.join(process.cwd(), '.AlgoSys', 'main', 'bin', 'links.bin');
}

async function loadLinks() {
  const filePath = getFilePath();
  try {
    const data = await fs.promises.readFile(filePath);
    return decodeLinks(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
}

async function saveLinks(links) {
  const filePath = getFilePath();
  const data = encodeLinks(links);
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await fs.promises.writeFile(filePath, data);
}

function encodeLinks(links) {
  const jsonString = JSON.stringify(links);
  const buffer = Buffer.from(jsonString, 'utf8');
  return buffer.toString('hex');
}

function decodeLinks(data) {
  const buffer = Buffer.from(data.toString(), 'hex');
  const jsonString = buffer.toString('utf8');
  return JSON.parse(jsonString);
}

module.exports = {
  Link,
  createLink,
  getLink,
  loadLinks,
  saveLinks,
  encodeLinks,
  decodeLinks,
};
