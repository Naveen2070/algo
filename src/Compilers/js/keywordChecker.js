function checkKeyword(line, currentFunction) {
  // Check for function call
  const funcCallMatch = line.match(/^(\w+)\((.*)\)$/);
  if (funcCallMatch) {
    const [, functionName, args] = funcCallMatch;
    return `${functionName}(${args});\n`;
  }

  // Check for Print statement
  const printMatch = line.match(
    /^Print\s*\(\s*"([^@]*)"\s*(?:@\s*"([^"]*)")?\s*\)$/
  );
  if (printMatch) {
    const message = printMatch[1];
    const marker = printMatch[2];
    if (marker) {
      return `console.log("${message}", "${marker}");\n`;
    } else {
      return `console.log("${message}");\n`;
    }
  }

  // Check for keywords
  let match;
  if ((match = line.match(/^(Const|Let)\s+(\w+)\s*=\s*(.+)/))) {
    const [, keyword, variable, value] = match;
    return `${keyword.toLowerCase()} ${variable} = ${value};\n`;
  }

  if ((match = line.match(/^For (\w+)\s+in\s+range\s+(.+)/))) {
    const [, variable, range] = match;
    return `for (let ${variable} = 0; ${variable} < ${range}; ${variable}++) {\n`;
  }

  if ((match = line.match(/^While\s+(.+)/))) {
    const [, condition] = match;
    return `while (${condition}) {\n`;
  }

  if ((match = line.match(/^If\s+(.+)/))) {
    const [, condition] = match;
    return `if (${condition}) {\n`;
  }

  if ((match = line.match(/^Else\s+(.+)/))) {
    const [, condition] = match;
    return `} else {\n`;
  }

  if ((match = line.match(/^return\s+(.+)/))) {
    const [, value] = match;
    if (currentFunction.name) {
      return `    return ${value};\n`;
    } else {
      return `return ${value};\n`;
    }
  }

  return line + '\n'; // Default case: return the line as is
}

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
