const { checkKeyword } = require('./keywordChecker');

function processFunction(line, currentFunction) {
  // Check for function definition
  const funcDefMatch = line.match(/^Start\s+(\w+)\s*\((.*)\)$/);
  if (funcDefMatch) {
    const [, functionName, params] = funcDefMatch;
    currentFunction.name = functionName;
    currentFunction.params = params.split(',').map((param) => param.trim());
    return `function ${functionName}(${params}) {\n`;
  }

  // Check for End of function
  if (line.startsWith('End')) {
    if (currentFunction.name) {
      currentFunction.name = '';
      currentFunction.params = [];
      return '}\n';
    } else {
      return '}\n'; // In case 'End' is not inside any function
    }
  }

  // Check for regular statements
  return checkKeyword(line, currentFunction);
}

module.exports = { processFunction };
