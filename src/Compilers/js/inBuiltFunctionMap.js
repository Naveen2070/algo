const { splitArrayAtFirstComma } = require('../../util/commanCheckers');

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

// Function to convert built-in array methods to their JavaScript equivalents
function convertArrayFunction(funcName, args) {
  // Parse the string arguments into an array
  const argArray = args.split(',').map((arg) => arg.trim());

  switch (funcName) {
    case 'Push Last':
      return `${argArray[0]}.push(${argArray.slice(1).join(', ')})`;
    case 'Pop Last':
      return `${argArray[0]}.pop()`;
    case 'Pop First':
      return `${argArray[0]}.shift()`;
    case 'Push First':
      return `${argArray[0]}.unshift(${argArray.slice(1).join(', ')})`;
    case 'Slice':
      return `${argArray[0]}.slice(${argArray.slice(1).join(', ')})`;
    case 'Splice':
      return `${argArray[0]}.splice(${argArray.slice(1).join(', ')})`;
    case 'Concat':
      return `${argArray[0]}.concat(${argArray.slice(1).join(', ')})`;
    case 'Join':
      const [argsString, argsDelimiter] = splitArrayAtFirstComma(
        args.split('')
      );
      return `${argsString}.join(${argsDelimiter})`;
    case 'Reverse':
      return `${argArray[0]}.reverse()`;
    case 'Sort':
      return `${argArray[0]}.sort(${argArray.slice(1).join(', ')})`;
    case 'IndexOf':
      return `${argArray[0]}.indexOf(${argArray.slice(1).join(', ')})`;
    case 'Last Index Of':
      return `${argArray[0]}.lastIndexOf(${argArray.slice(1).join(', ')})`;
    case 'Includes':
      return `${argArray[0]}.includes(${argArray.slice(1).join(', ')})`;
    case 'Every':
      return `${argArray[0]}.every(${argArray.slice(1).join(', ')})`;
    case 'Some':
      return `${argArray[0]}.some(${argArray.slice(1).join(', ')})`;
    case 'Filter':
      return `${argArray[0]}.filter(${argArray.slice(1).join(', ')})`;
    case 'Map':
      return `${argArray[0]}.map(${argArray.slice(1).join(', ')})`;
    case 'ForEach':
      return `${argArray[0]}.forEach(${argArray.slice(1).join(', ')})`;
    case 'Reduce':
      return `${argArray[0]}.reduce(${argArray.slice(1).join(', ')})`;
    case 'Reduce Right':
      return `${argArray[0]}.reduceRight(${argArray.slice(1).join(', ')})`;
    case 'Find':
      return `${argArray[0]}.find(${argArray.slice(1).join(', ')})`;
    case 'Find Index':
      return `${argArray[0]}.findIndex(${argArray.slice(1).join(', ')})`;
    default:
      return '';
  }
}

module.exports = {
  convertMathFunction,
  convertUnaryFunction,
  convertStringFunction,
  convertArrayFunction,
};
