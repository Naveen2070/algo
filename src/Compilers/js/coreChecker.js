function processLink(line) {
  // Check for New Link
  if (line.includes('New Link')) {
    return line.replace(
      /New Link\s*\(\s*["'](.+?)["']\s*\)/g,
      "createLink('$1')"
    );
  }

  // Check for Link To
  if (line.includes('Link To')) {
    return line.replace(/Link To\s*\(\s*["'](.+?)["']\s*\)/g, "getLink('$1')");
  }

  // Check for Set Link
  if (line.includes('Set Link')) {
    return line.replace(
      /Set Link\s*\(\s*(.+?)\s*,\s*["'](.+?)["']\s*\)/g,
      '$2.set($1)'
    );
  }

  // Check for Get Link
  if (line.includes('Get Link')) {
    return line.replace(/Get Link\s*\(\s*["'](.+?)["']\s*\)/g, '$1.get()');
  }

  // Check for Unlink
  if (line.includes('Unlink')) {
    return line.replace(/Unlink\s*\(\s*["'](.+?)["']\s*\)/g, '$1.destroy()');
  }

  return line;
}

module.exports = { processLink };
