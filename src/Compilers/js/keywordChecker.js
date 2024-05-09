function checkKeyword(line, currentFunction) {
  // Check for function call
  const funcCallMatch = line.match(/^(\w+)\((.*)\)$/);
  if (funcCallMatch) {
    const [, functionName, args] = funcCallMatch;
    return `${functionName}(${args});\n`;
  }

  // Check for Print statement
  const printMatch = line.match(/^Print\s*\((.*)\)$/);
  if (printMatch) {
    let statement = printMatch[1].trim();
    if (statement.startsWith('result')) {
      const resultName = statement.split('=')[1].trim();
      return `console.log(${resultName},"result");\n`;
    } else {
      return `console.log(${statement});\n`;
    }
  }

  // Check for keywords
  if (line.startsWith('Const')) {
    const [_, variable, value] = line.match(/Const (\w+)\s*=\s*(.+)/);
    return `const ${variable} = ${value};\n`;
  } else if (line.startsWith('Let')) {
    const [_, variable, value] = line.match(/Let (\w+)\s*=\s*(.+)/);
    return `let ${variable} = ${value};\n`;
  } else if (line.startsWith('For')) {
    const [_, variable, range] = line.match(/For (\w+)\s+in\s+range\s+(.+)/);
    return `for (let ${variable} = 0; ${variable} < ${range}; ${variable}++) {\n`;
  } else if (line.startsWith('return')) {
    const [_, value] = line.match(/return\s+(.+)/);
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
