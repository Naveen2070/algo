const { CoreChecker } = require('./coreChecker');
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
  line = CoreChecker(line);

  line = processAsyncFunction(line, currentFunction);

  // Check for regular statements
  return checkKeyword(line, currentFunction);
}

function processAsyncFunction(line, currentFunction) {
  // Check for function definition
  const funcDefMatch = line.match(/^Delay\s+(\w+)\s*\((.*)\)$/);
  if (funcDefMatch) {
    const [, functionName, params] = funcDefMatch;
    currentFunction.name = functionName;
    currentFunction.params = params.split(',').map((param) => param.trim());
    return `async function ${functionName}(${params}) {\n`;
  }

  // Check for End of function
  if (line.startsWith('End')) {
    currentFunction.name = '';
    currentFunction.params = [];
    return '}\n';
  }

  return line;
}

function importChecker(code, config, outputType) {
  console.log(config, outputType.toString() === 'Run');
  const lines = code.split('\n');
  let createLinkFound = false;
  let getLinkFound = false;
  let useStatement = null; // Variable to store the type of "Use" statement found
  const isProduction = config.Mode === 'Production';
  const isRun =
    outputType.toString() === '2' ||
    outputType.toString() === 'Run' ||
    outputType.toString() === 'run';
  console.log(!isProduction && isRun);
  // Check for existing imports and keywords in the code
  for (const line of lines) {
    if (line.includes('createLink')) createLinkFound = true;
    if (line.includes('getLink')) getLinkFound = true;
    if (line.startsWith('Use ')) {
      // Extract the "Use" statement type
      useStatement = line.substring('Use '.length).trim();
      break; // Stop after finding the first "Use" statement
    }
  }

  // Prepare the import statement based on the "Use" statement found
  let importStatement = '';

  switch (useStatement) {
    case 'ADS':
      importStatement +=
        isProduction && !isRun
          ? `const ADS = require('alg-compiler/core/ADS/ADS');\n`
          : !isProduction && isRun
          ? `const ADS = require('../Core/ADS/ADS');\n`
          : `const ADS = require('../../src/Compilers/js/Core/ADS/ADS');\n`;
      break;
    case 'Threads':
      importStatement +=
        isProduction && !isRun
          ? `const Threads = require('alg-compiler/core/Process/Threads');\n`
          : !isProduction && isRun
          ? `const Threads = require('../Core/Process/Threads');\n`
          : `const Threads = require('../../src/Compilers/js/Core/Process/Threads');\n`;
      break;
    default:
      break;
  }

  // Add default imports if necessary
  if (createLinkFound && getLinkFound && !useStatement) {
    importStatement +=
      isProduction && !isRun
        ? `const { createLink, getLink } = require('alg-compiler/core/state/Link');\n`
        : !isProduction && isRun
        ? `const { createLink, getLink } = require('../Core/State/Link');\n`
        : `const { createLink, getLink } = require('../../src/Compilers/js/Core/State/Link');\n`;
  } else if (getLinkFound && !useStatement) {
    importStatement +=
      isProduction && !isRun
        ? `const { getLink } = require('alg-compiler/core/state/Link');\n`
        : !isProduction && isRun
        ? `const { getLink } = require('../Core/State/Link');\n`
        : `const { getLink } = require('../../src/Compilers/js/Core/State/Link');\n`;
  } else if (createLinkFound && !useStatement) {
    importStatement +=
      isProduction && !isRun
        ? `const { createLink } = require('alg-compiler/core/state/Link');\n`
        : !isProduction && isRun
        ? `const { createLink } = require('../Core/State/Link');\n`
        : `const { createLink } = require('../../src/Compilers/js/Core/State/Link');\n`;
  }

  // Remove the "Use" statement from the lines
  const filteredLines = lines.filter((line) => !line.startsWith('Use '));

  // Prepend the generated import statement to the filtered lines of code
  const processedCode = importStatement + filteredLines.join('\n');
  return processedCode;
}

module.exports = { processFunction, importChecker, processAsyncFunction };
