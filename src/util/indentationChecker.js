function fixIndentation(pyCode) {
  // Split the code into lines
  const lines = pyCode.split('\n');
  // Initialize the corrected code string
  let correctedCode = '';

  // Define the characters that increase or decrease the indentation level
  const increaseIndentChars = [
    'def',
    'for',
    'while',
    'if',
    'elif',
    'else:',
    'class',
  ];
  const decreaseIndentChars = ['return', 'break', 'continue'];

  // Define characters that indicate compound statements that increase indentation
  const compoundStatementChars = [':'];

  // Initialize the indentation level
  let currentIndentation = 0;

  // Iterate through each line of the Python code
  for (let line of lines) {
    // Remove leading and trailing whitespaces
    line = line.trim();
    // Ignore empty lines
    if (line === '') continue;

    // Decrease indentation if line starts with a decreaseIndentChar
    if (decreaseIndentChars.some((keyword) => line.startsWith(keyword))) {
      currentIndentation--;
    }

    // Add the current indentation level to the corrected code
    correctedCode += '  '.repeat(currentIndentation) + line + '\n';

    // Increase indentation if line ends with a compoundStatementChar
    if (compoundStatementChars.some((char) => line.endsWith(char))) {
      currentIndentation++;
    }

    // Increase indentation if next line starts with an increaseIndentChar and is not followed by a decreaseIndentChar
    const nextLineIndex = lines.indexOf(line) + 1;
    if (nextLineIndex < lines.length) {
      const nextLine = lines[nextLineIndex].trim();
      if (
        increaseIndentChars.some((keyword) => nextLine.startsWith(keyword)) &&
        !decreaseIndentChars.some((keyword) => nextLine.startsWith(keyword))
      ) {
        currentIndentation++;
      }
    }
  }

  return correctedCode;
}

module.exports = { fixIndentation };
