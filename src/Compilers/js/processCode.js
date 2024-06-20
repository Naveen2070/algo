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
  const lines = code.split('\n');
  let useStatements = []; // Array to store the types of "Use" statements found
  const isProduction = config.Mode === 'Production';
  const isRun =
    outputType.toString() === '2' ||
    outputType.toString() === 'Run' ||
    outputType.toString() === 'run';

  // Check for existing imports and keywords in the code
  for (const line of lines) {
    if (line.startsWith('Use ')) {
      // Extract the "Use" statement types and split by comma
      const modules = line.substring('Use '.length).trim().split(',');
      useStatements = useStatements.concat(
        modules.map((module) => module.trim())
      );
    }
  }

  // Prepare the import statements based on the "Use" statements found
  let importStatements = '';

  if (useStatements.includes('ADS')) {
    importStatements +=
      isProduction && !isRun
        ? `const ADS = require('alg-compiler/core/ADS/ADS');\n`
        : !isProduction && isRun
        ? `const ADS = require('../Core/ADS/ADS');\n`
        : `const ADS = require('../../src/Compilers/js/Core/ADS/ADS');\n`;
  }

  if (useStatements.includes('Threads')) {
    importStatements +=
      isProduction && !isRun
        ? `const Threads = require('alg-compiler/core/Process/Threads');\n`
        : !isProduction && isRun
        ? `const Threads = require('../Core/Process/Threads');\n`
        : `const Threads = require('../../src/Compilers/js/Core/Process/Threads');\n`;
  }

  if (useStatements.includes('Links')) {
    importStatements +=
      isProduction && !isRun
        ? `const Links = require('alg-compiler/core/State/Link');\n`
        : !isProduction && isRun
        ? `const Links = require('../Core/State/Link');\n`
        : `const Links = require('../../src/Compilers/js/Core/State/Link');\n`;
  }

  // Remove the "Use" statements from the lines
  const filteredLines = lines.filter((line) => !line.startsWith('Use '));

  // Prepend the generated import statements to the filtered lines of code
  const processedCode = importStatements + filteredLines.join('\n');
  return processedCode;
}

module.exports = { processFunction, importChecker, processAsyncFunction };
