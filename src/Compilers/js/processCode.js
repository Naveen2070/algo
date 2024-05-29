const { processLink } = require('./coreChecker');
const { checkKeyword } = require('./keywordChecker');

function processFunction(line, currentFunction) {
  // Check for Run keyword
  if (line.startsWith('Run')) {
    // Extract function name from the line
    const functionName = line
      .substring(line.indexOf(' ') + 1)
      .trim()
      .replace(/\(.*\)/, ''); // Remove parentheses and parameters
    // Convert the line into an Immediately Invoked Function Expression (IIFE)
    const params = line
      .match(/\((.*?)\)/)[1]
      .split(',')
      .map((param) => param.trim())
      .join(', ');
    return `(function ${functionName || 'main'}(${params}) {\n`;
  }

  // Check for function definition
  const funcDefMatch = line.match(/^Start\s+(\w+)\s*\((.*)\)$/);
  if (funcDefMatch) {
    const [, functionName, params] = funcDefMatch;
    currentFunction.name = functionName;
    currentFunction.params = params.split(',').map((param) => param.trim());
    return `function ${functionName}(${params}) {\n`;
  }

  // Check for End of function
  if (line.startsWith('Ends')) {
    const toReturn = `})(${currentFunction.params.join(', ')});\n`;
    currentFunction.name = '';
    currentFunction.params = [];
    return toReturn;
  }

  // Check for End of IIFE
  if (line.startsWith('End')) {
    currentFunction.name = '';
    currentFunction.params = [];
    return '}\n';
  }

  // Check for Link keywords
  line = processLink(line);

  // Check for regular statements
  return checkKeyword(line, currentFunction);
}

function importChecker(code, config, outputType) {
  console.log(config);
  const lines = code.split('\n');
  let createLinkFound = false;
  let getLinkFound = false;
  const isProduction = config.Mode === 'Production';
  const isRun =
    outputType === '2' || outputType === 'Run' || outputType === 'run';

  for (const line of lines) {
    if (line.includes('createLink')) createLinkFound = true;
    if (line.includes('getLink')) getLinkFound = true;
  }

  let importStatement = '';
  if (createLinkFound && getLinkFound) {
    importStatement +=
      isProduction && !isRun
        ? `const { createLink,getLink } = require('alg-compiler/core/state/Link');\n`
        : !isProduction && isRun
        ? `const { createLink,getLink } = require('../Core/State/Link')\n`
        : `const { createLink,getLink } = require('../../src/Compilers/js/Core/State/Link')\n`;
  } else if (getLinkFound) {
    importStatement +=
      isProduction && !isRun
        ? `const { getLink } = require('alg-compiler/core/state/Link');\n`
        : !isProduction && isRun
        ? `const { getLink } = require('../Core/State/Link')\n`
        : `const { getLink } = require('../../src/Compilers/js/Core/State/Link')\n`;
  } else if (createLinkFound) {
    importStatement +=
      isProduction && !isRun
        ? `const { createLink } = require('alg-compiler/core/state/Link');\n`
        : !isProduction && isRun
        ? `const { createLink } = require('../Core/State/Link')\n`
        : `const { createLink } = require('../../src/Compilers/js/Core/State/Link')\n`;
  }
  return importStatement + code;
}

module.exports = { processFunction, importChecker };
