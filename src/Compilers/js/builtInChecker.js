function convertMathFunction(funcName, args) {
  const jsFunction = {
    'Round up': 'Math.ceil',
    'Round down': 'Math.floor',
    Round: 'Math.round',
    'Absolute value': 'Math.abs',
    Exponential: 'Math.exp',
    'Natural logarithm': 'Math.log',
    'Base 10 logarithm': 'Math.log10',
    Minimum: 'Math.min',
    Maximum: 'Math.max',
    'Power of': 'Math.pow',
    Root: 'Math.sqrt',
  }[funcName];

  return `${jsFunction}(${args.trim()})`;
}

function convertUnaryFunction(funcName, args) {
  const jsFunction = {
    Increment: '++',
    Decrement: '--',
  }[funcName];

  return `${args.trim()}${jsFunction}`;
}

function convertStringFunction(funcName, args) {
  function splitArrayAtFirstComma(arr) {
    const commaIndex = arr.indexOf(',');
    if (commaIndex === -1) {
      return null;
    }
    const firstHalf = arr.slice(0, commaIndex).join('');
    const secondHalf = arr.slice(commaIndex + 1).join('');
    return [firstHalf, secondHalf];
  }

  switch (funcName) {
    case 'To Uppercase':
      return `${args.trim()}.toUpperCase()`;
    case 'To Lowercase':
      return `${args.trim()}.toLowerCase()`;
    case 'Substring':
      const [string, start, end] = args.split(',');
      return `${string.trim()}.substring(${start.trim()}, ${end.trim()})`;
    case 'String Length':
      return `${args.trim()}.length`;
    case 'Char At':
      const [charAtString, charIndex] = args.split(',');
      return `${charAtString.trim()}.charAt(${charIndex.trim()})`;
    case 'Char Code At':
      const [charCodeAtString, index] = args.split(',');
      return `${charCodeAtString.trim()}.charCodeAt(${index.trim()})`;
    case 'At':
      const [atString, pos] = args.split(',');
      return `${atString.trim()}[${pos.trim()}]`;
    case 'Index of':
      const [indexOfString, searchValue] = args.split(',');
      return `${indexOfString.trim()}.indexOf(${searchValue.trim()})`;
    case 'Last Index of':
      const [lastIndexOfString, lastSearchValue] = args.split(',');
      return `${lastIndexOfString.trim()}.lastIndexOf(${lastSearchValue.trim()})`;
    case 'Starts with':
      const [startsWithString, searchString] = args.split(',');
      return `${startsWithString.trim()}.startsWith(${searchString.trim()})`;
    case 'Ends with':
      const [endsWithString, endsWithStringValue] = args.split(',');
      return `${endsWithString.trim()}.endsWith(${endsWithStringValue.trim()})`;
    case 'Replace':
      const [replaceString, searchValueReplace, replaceWithValue] =
        args.split(',');
      return `${replaceString.trim()}.replace(${searchValueReplace.trim()}, ${replaceWithValue.trim()})`;
    case 'Split':
      const params = args.split('');
      const [splitString, splitDelimiter] = splitArrayAtFirstComma(params);
      return `${splitString.trim()}.split(${splitDelimiter.trim()})`;
    case 'Concat':
      const [string1, string2] = args.split(',');
      return `${string1.trim()}.concat(${string2.trim()})`;
    case 'Includes':
      const [includesString, searchStringInclude] = args.split(',');
      return `${includesString.trim()}.includes(${searchStringInclude.trim()})`;
    case 'Slice':
      const [sliceString, startSlice, endSlice] = args.split(',');
      return `${sliceString.trim()}.slice(${startSlice.trim()}, ${endSlice.trim()})`;
    case 'Substr':
      const [substrString, startSubstr, lengthSubstr] = args.split(',');
      return `${substrString.trim()}.substr(${startSubstr.trim()}, ${lengthSubstr.trim()})`;
    case 'Pad Start':
      const [padStartString, targetLength, padStringStart] = args.split(',');
      return `${padStartString.trim()}.padStart(${targetLength.trim()}, ${padStringStart.trim()})`;
    case 'Pad End':
      const [padEndString, targetLengthEnd, padStringEnd] = args.split(',');
      return `${padEndString.trim()}.padEnd(${targetLengthEnd.trim()}, ${padStringEnd.trim()})`;
    case 'Repeat':
      const [repeatString, countRepeat] = args.split(',');
      return `${repeatString.trim()}.repeat(${countRepeat.trim()})`;
    case 'Replace All':
      const [replaceAllString, searchValueReplaceAll, replaceWithValueAll] =
        args.split(',');
      return `${replaceAllString.trim()}.replaceAll(${searchValueReplaceAll.trim()}, ${replaceWithValueAll.trim()})`;
    case 'Trim Start':
      return `${args.trim()}.trimStart()`;
    case 'Trim End':
      return `${args.trim()}.trimEnd()`;
    case 'Trim':
      return `${args.trim()}.trim()`;
    default:
      return '';
  }
}

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

  // Construct a regular expression pattern to match any built-in function call
  const pattern = new RegExp(
    `(${[...mathFunctions, ...unaryFunctions, ...stringFunctions].join(
      '|'
    )})\\s*\\(([^)]*)\\)`,
    'g'
  );

  // Replace all occurrences of built-in function calls with their JavaScript equivalents
  line = line.replace(pattern, (match, funcName, args) => {
    if (mathFunctions.includes(funcName)) {
      return convertMathFunction(funcName, args);
    } else if (unaryFunctions.includes(funcName)) {
      return convertUnaryFunction(funcName, args);
    } else if (stringFunctions.includes(funcName)) {
      return convertStringFunction(funcName, args);
    } else {
      return match; // Return the original match if not found
    }
  });

  return line + '\n'; // Return the modified line
}

module.exports = { checkBuiltInFunctions };
