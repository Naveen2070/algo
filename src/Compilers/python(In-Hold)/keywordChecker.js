function checkKeyword(line, currentFunction) {
  // Check for function call
  const funcCallMatch = line.match(/^(\w+)\((.*)\)$/);
  if (funcCallMatch) {
    const [, functionName, args] = funcCallMatch;
    return `${functionName}(${args})\n`;
  }

  // Check for Print statement
  const printMatch = line.match(/^Print\s*\(\s*(.+)\s*\)$/);
  if (printMatch) {
    const content = printMatch[1];
    return `print(${content})\n`;
  }

  // Check for keywords
  let match;
  if ((match = line.match(/^(Const)\s+(\w+)\s*=\s*(.+)/))) {
    const [, keyword, variable, value] = match;
    if (value === undefined) {
      console.error('Error: const declaration must be initialized.');
      return ''; // Return empty string to signify error
    }
    return `${variable} = ${value}\n`;
  }

  if ((match = line.match(/^(Let)\s+(\w+)\s*(?:=\s*(.+))?/))) {
    const [, keyword, variable, value] = match;
    if (value === undefined) {
      return `${variable}\n`;
    }
    return `${variable} = ${value}\n`;
  }

  if ((match = line.match(/^For (\w+)\s+in\s+range\s+(.+)/))) {
    const [, variable, range] = match;
    return `for ${variable} in range(${range}):\n`;
  }

  if ((match = line.match(/^While\s+(.+)/))) {
    const [, condition] = match;
    return `while ${condition}:\n`;
  }

  if ((match = line.match(/^If\s+(.+)/))) {
    const [, condition] = match;
    return `if ${condition}:\n`;
  }

  if ((match = line.match(/^Else If\s+(.+)/))) {
    const [, condition] = match;
    return `elif {condition}:\n`;
  }

  if ((match = line.match(/^Else/))) {
    return 'else:\n';
  }

  if ((match = line.match(/^Switch to\s+(\w+)/))) {
    const [, variable] = match;
    return `{variable} = {{\n`;
  }

  if ((match = line.match(/^When\s+(.+)/))) {
    const [, condition] = match;
    return `    ${condition}: \n`;
  }

  if ((match = line.match(/^Usually\s+(.+)/))) {
    const [, expression] = match;
    return `    default: \n        {expression} \n`;
  }

  if ((match = line.match(/^Stop/))) {
    return '        break\n';
  }

  if ((match = line.match(/^return\s+(.+)/))) {
    const [, value] = match;
    if (currentFunction.name) {
      return `    return ${value}\n`;
    } else {
      return `return ${value}\n`;
    }
  }

  return line + '\n'; // Default case: return the line as is
}

module.exports = { checkKeyword };
