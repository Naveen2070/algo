const fs = require('fs');
const { processFunction } = require('./processFunction');

function compileToPython(code, outputType, fileName, config) {
  const lines = code.split('\n');
  let pythonCode = '';
  let currentIndentation = ''; // Track current indentation

  let currentFunction = { name: '', params: [] };

  for (let line of lines) {
    line = line.trim();
    const processedLine = processFunction(line, currentFunction);

    // Update indentation based on processed line
    const indentationChange = processedLine.match(/^(\s*)/)[0];
    currentIndentation = indentationChange;

    // Add the processed line to pythonCode with proper indentation
    pythonCode += currentIndentation + processedLine.trim() + '\n';
  }

  if (
    outputType === 'Convert' ||
    outputType === 'convert' ||
    outputType === '1'
  ) {
    if (!fileName) fileName = 'output'; // Default file name
    fs.writeFileSync(`${fileName}.py`, pythonCode);
    console.log(`Python file generated: ${fileName}.py`);
  } else {
    // Execute the Python code using Python interpreter
    // Assuming Python interpreter is available in the system
    const { exec } = require('child_process');
    exec(`python ${fileName}.py`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python code: ${error}`);
        return;
      }
      console.log(`Python code executed successfully:\n${stdout}`);
      if (stderr) {
        console.error(`Error: ${stderr}`);
      }
    });
  }
}

module.exports = { compileToPython };
