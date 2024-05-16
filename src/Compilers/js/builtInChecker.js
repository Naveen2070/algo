function checkBuiltInFunctions(line) {
  const builtInFunctions = {
    'Round up': 'Math.ceil',
    'Round down': 'Math.floor',
    Round: 'Math.round',
    'Absolute value': 'Math.abs',
    Exponential: 'Math.exp',
    'Natural logarithm': 'Math.log',
    'Base 10 logarithm': 'Math.log10',
    Minimum: 'Math.min',
    Maximum: 'Math.max',
    Power: '**',
    Root: 'Math.sqrt',
    Increment: '++',
    Decrement: '--',
    'Power of': 'Math.pow',
  };
  // Construct a regular expression pattern to match any built-in function call
  const pattern = new RegExp(
    `(${Object.keys(builtInFunctions).join('|')})\\s*\\(([^\\)]*)\\)`,
    'g'
  );

  // Replace all occurrences of built-in function calls with their JavaScript equivalents
  line = line.replace(pattern, (match, funcName, args) => {
    const jsFunction = builtInFunctions[funcName];
    // For increment and decrement, we don't need to pass any arguments
    if (jsFunction === '++' || jsFunction === '--') {
      return `${args.trim()}${jsFunction}`;
    } else if (funcName === 'Power') {
      const [base, exponent] = args.split(',');
      return `${base.trim()} ** ${exponent.trim()}`;
    }
    // For other functions, return the function call with arguments
    return `${jsFunction}(${args.trim()})`;
  });

  return line + '\n'; // Return the modified line
}

module.exports = { checkBuiltInFunctions };
