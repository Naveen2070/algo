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

  // Check for regular statements
  return checkKeyword(line, currentFunction);
}

module.exports = { processFunction };
