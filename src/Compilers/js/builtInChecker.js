const {
  convertMathFunction,
  convertUnaryFunction,
  convertStringFunction,
  convertArrayFunction,
} = require('./inBuiltFunctionMap');

function checkBuiltInFunctions(line) {
  const mathFunctions = [
    'Round up',
    'Round down',
    'Round',
    'Absolute value',
    'Exponential',
    'Natural logarithm',
    'Base 10 logarithm',
    'Minimum',
    'Maximum',
    'Power of',
    'Root',
  ];

  const unaryFunctions = ['Increment', 'Decrement'];

  const stringFunctions = [
    'To Uppercase',
    'To Lowercase',
    'Substring',
    'String Length',
    'Char At',
    'Char Code At',
    'At',
    'Index of',
    'Last Index of',
    'Starts with',
    'Ends with',
    'Replace',
    'Split',
    'Concat',
    'Includes',
    'Slice',
    'Substr',
    'Pad Start',
    'Pad End',
    'Repeat',
    'Replace All',
    'Trim Start',
    'Trim End',
    'Trim',
  ];

  const arrayFunctions = [
    'Push Last',
    'Pop Last',
    'Pop First',
    'Push First',
    'Slice',
    'Splice',
    'Concat',
    'Join',
    'Reverse',
    'Sort',
    'IndexOf',
    'Last Index Of',
    'Includes',
    'Every',
    'Some',
    'Filter',
    'Map',
    'ForEach',
    'Reduce',
    'Reduce Right',
    'Find',
    'Find Index',
  ];

  // Construct a regular expression pattern to match any built-in function call
  const pattern = new RegExp(
    `(${[
      ...mathFunctions,
      ...unaryFunctions,
      ...stringFunctions,
      ...arrayFunctions,
    ].join('|')})\\s*\\(([^)]*)\\)`,
    'g'
  );

  // Replace all occurrences of built-in function calls with their JavaScript equivalents
  let checkedLine = line.replace(pattern, (match, funcName, args) => {
    if (mathFunctions.includes(funcName)) {
      return convertMathFunction(funcName, args);
    } else if (unaryFunctions.includes(funcName)) {
      return convertUnaryFunction(funcName, args);
    } else if (stringFunctions.includes(funcName)) {
      return convertStringFunction(funcName, args);
    } else if (arrayFunctions.includes(funcName)) {
      return convertArrayFunction(funcName, args);
    } else {
      return match; // Return the original match if not found
    }
  });

  // Check for Print statement
  const printMatch = checkedLine.match(/^Print\s*\(\s*(.+)\s*\)$/);
  if (printMatch) {
    const content = printMatch[1];
    checkedLine = `console.log(${content});\n`;
  }

  return checkedLine + '\n'; // Return the modified line
}

module.exports = { checkBuiltInFunctions };
