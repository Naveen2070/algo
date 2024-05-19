const fs = require('fs');
const { processFunction } = require('./processFunction');
const path = require('path');
const os = require('os');

// Helper function to format the local timestamp
function getLocalTimestamp() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return now.toLocaleString('en-GB', options);
}

function compileToJs(code, outputType, fileName, config) {
  // Split the code into lines
  const lines = code.split('\n');
  let jsCode = '';

  let currentFunction = { name: '', params: [] };

  for (let line of lines) {
    line = line.trim();
    jsCode += processFunction(line, currentFunction);
  }

  const logData = {
    timestamp: new Date().toISOString(), // UTC timestamp
    localTimestamp: getLocalTimestamp(), // Local timestamp
    action: outputType === 'Convert' ? 'Conversion' : 'Execution',
    codeFileName: fileName || 'output',
    language: 'JavaScript',
    config: config,
    result: '',
    error: '',
  };

  if (
    outputType === 'Convert' ||
    outputType === 'convert' ||
    outputType === '1'
  ) {
    if (!fileName) fileName = 'output'; // Default file name
    const algFilePath = path.resolve(fileName); // Get the absolute path of the .alg file
    const algFileDir = path.dirname(algFilePath); // Get the directory of the .alg file

    // Use the specified output folder from config or default to 'output'
    const outFolder = config.OutFolder || 'output';

    // Create the output folder if it doesn't exist
    const outputFolderPath = path.join(algFileDir, outFolder);
    if (!fs.existsSync(outputFolderPath)) {
      fs.mkdirSync(outputFolderPath, { recursive: true });
    }

    const outputFile = path.parse(fileName);
    const outputFileName = path.join(outputFolderPath, `${outputFile.name}.js`); // Use the same name as the alg file with .js extension
    fs.writeFileSync(outputFileName, jsCode);
    console.log(`JavaScript file generated: ${outputFileName}`);
    logData.result = `JavaScript file generated: ${outputFileName}`;

    logToFile(logData);
  } else {
    // Create a temporary file
    const tempFolder = path.join(__dirname, 'temp');
    if (!fs.existsSync(tempFolder)) {
      fs.mkdirSync(tempFolder, { recursive: true });
    }
    const tempFileName = path.join(tempFolder, 'temp.js');
    fs.writeFileSync(tempFileName, jsCode);

    // Execute the temporary file
    const { exec } = require('child_process');
    exec(`node ${tempFileName}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing code: ${error.message}`);
        logData.error = `Error executing code: ${error.message}`;
        logToFile(logData);
        return;
      }
      if (stderr) {
        console.error(`Error output: ${stderr}`);
        logData.error = `Error output: ${stderr}`;
        logToFile(logData);
        return;
      }
      console.log('Result:', stdout);
      logData.result = stdout;

      // Delete the temporary file
      try {
        fs.unlinkSync(tempFileName);
      } catch (err) {
        console.error(`Error deleting temporary file: ${err.message}`);
      }

      logToFile(logData);
    });
  }
}

function logToFile(data) {
  const logFolder = path.join(__dirname, 'log');
  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder);
  }
  const logFilePath = path.join(logFolder, 'log.json');
  let logEntries = [];

  // Read existing log entries if log file exists
  if (fs.existsSync(logFilePath)) {
    const existingLogData = fs.readFileSync(logFilePath, 'utf-8');
    logEntries = JSON.parse(existingLogData);
  }

  logEntries.push(data);

  // Write updated log entries to the log file
  fs.writeFileSync(logFilePath, JSON.stringify(logEntries, null, 2) + os.EOL);
}

module.exports = { compileToJs };
