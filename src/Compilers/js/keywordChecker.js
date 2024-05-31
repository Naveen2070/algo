const { checkBuiltInFunctions } = require('./builtInChecker');

function checkKeyword(line, currentFunction) {
  let checkedLine = line;

  // Check for function call
  const funcCallMatch = checkedLine.match(/^(\w+)\((.*)\)$/);
  if (funcCallMatch) {
    const [, functionName, args] = funcCallMatch;
    checkedLine = `${functionName}(${args});\n`;
  }

  // Check for Print statement
  const printMatch = checkedLine.match(/^Print\s*\(\s*(.+)\s*\)$/);
  if (printMatch) {
    const content = printMatch[1];
    checkedLine = `console.log(${content});\n`;
  }

  // Handle Sync keyword
  checkedLine = checkedLine.replace(/\bSync\s+(\w+)/, 'await $1');

  // Check for keywords and perform replacements
  checkedLine = checkedLine.replace(
    /^(Const)\s+(\w+)\s*=\s*(.+)/,
    (match, keyword, variable, value) => {
      if (value === undefined) {
        console.error('Error: const declaration must be initialized.');
        return ''; // Return empty string to signify error
      }
      return `${keyword.toLowerCase()} ${variable} = ${value};\n`;
    }
  );

  checkedLine = checkedLine.replace(
    /^(Let)\s+(\w+)\s*(?:=\s*(.+))?/,
    (match, keyword, variable, value) => {
      if (value === undefined) {
        return `${keyword.toLowerCase()} ${variable};\n`;
      }
      return `${keyword.toLowerCase()} ${variable} = ${value};\n`;
    }
  );

  checkedLine = checkedLine.replace(
    /^For (\w+)\s+in\s+range\s+(.+)/,
    (match, variable, range) => {
      return `for (let ${variable} = 0; ${variable} < ${range}; ${variable}++) {\n`;
    }
  );

  checkedLine = checkedLine.replace(/^While\s+(.+)/, (match, condition) => {
    return `while (${condition}) {\n`;
  });

  checkedLine = checkedLine.replace(/^If\s+(.+)/, (match, condition) => {
    return `if (${condition}) {\n`;
  });

  checkedLine = checkedLine.replace(/^Else If\s+(.+)/, (match, condition) => {
    return `} else if (${condition}) {\n`;
  });

  checkedLine = checkedLine.replace(/^Else/, () => {
    return `} else {\n`;
  });

  checkedLine = checkedLine.replace(/^Switch to\s+(\w+)/, (match, variable) => {
    return `switch (${variable}) {\n`;
  });

  checkedLine = checkedLine.replace(/^When\s+(.+)/, (match, condition) => {
    return `  case ${condition}:\n`;
  });

  checkedLine = checkedLine.replace(/^Usually\s+(.+)/, (match, expression) => {
    return `  default:\n    ${expression}\n`;
  });

  checkedLine = checkedLine.replace(/^Stop/, () => {
    return `break;\n`;
  });

  checkedLine = checkedLine.replace(/^Return\s+(.+)/, (match, value) => {
    if (currentFunction.name) {
      return `    return ${value};\n`;
    } else {
      return `return ${value};\n`;
    }
  });

  // Check for Export keyword
  if (checkedLine.startsWith('Export')) {
    const functionName = line
      .substring(line.indexOf(' ') + 1)
      .trim()
      .replace(/\(.*\)/, ''); // Remove parentheses and parameters
    return `module.exports = { ${functionName || 'main'} };\n`;
  }

  // Check for Import keyword
  if (checkedLine.startsWith('Import')) {
    const [keyword, functionName, , modulePath] = line.split(/\s+/);
    const importPath = modulePath.replace(/\/?$/, ''); // Remove trailing slash
    return `const { ${functionName} } = require('.${importPath}');\n`;
  }

  return checkBuiltInFunctions(checkedLine); // Send the reconstructed code to the built-in checker
}

module.exports = { checkKeyword };
