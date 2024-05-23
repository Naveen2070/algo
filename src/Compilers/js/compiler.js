const fs = require('fs');
const { processFunction, importChecker } = require('./processCode');
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

function compileToJs(code, outputType, fileName, filePath, directory, config) {
  // Split the code into lines
  const lines = code.split('\n');
  let jsCode = '';

  let currentFunction = { name: '', params: [] };

  for (let line of lines) {
    line = line.trim();
    jsCode += processFunction(line, currentFunction);
  }

  // Add import statements if necessary
  jsCode = importChecker(jsCode, config, outputType);

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

  // Determine the relative path of the file relative to the root directory
  const relativePath = path.relative(directory, filePath);

  // Use the specified output folder from config or default to 'output'
  const outFolder = config.OutFolder || 'output';

  // Create the output folder if it doesn't exist
  const outputFolderPath = path.join(
    directory,
    outFolder,
    path.dirname(relativePath)
  );
  if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath, { recursive: true });
  }

  const outputFile = path.parse(filePath);
  const outputFileName = path.join(outputFolderPath, `${outputFile.name}.js`); // Use the same name as the alg file with .js extension
  fs.writeFileSync(outputFileName, jsCode);
  logData.result = `JavaScript file generated: ${outputFileName}`;

  logToFile(logData);

  // Create a temporary folder mirroring the input file structure
  const tempFolder = path.join(__dirname, 'temp', path.dirname(relativePath));
  if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder, { recursive: true });
  }

  // Store the temp file paths to execute them later
  const tempFilePath = path.join(tempFolder, `${outputFile.name}.js`);
  fs.writeFileSync(tempFilePath, jsCode);

  if (outputType === 'Run' || outputType === 'run' || outputType === '2') {
    executeTempFile(tempFilePath, logData);
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

function executeTempFile(tempFilePath, logData) {
  const { exec } = require('child_process');
  exec(`node ${tempFilePath}`, (error, stdout, stderr) => {
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
      fs.unlinkSync(tempFilePath);
      // Remove empty parent directories recursively
      removeEmptyParentDirectories(path.dirname(tempFilePath));
    } catch (err) {
      console.error(`Error deleting temporary file: ${err.message}`);
    }

    logToFile(logData);
  });
}

function removeEmptyParentDirectories(directory) {
  const parent = path.resolve(directory, '..');
  if (
    directory !== __dirname &&
    fs.existsSync(directory) &&
    fs.readdirSync(directory).length === 0
  ) {
    fs.rmdirSync(directory);
    removeEmptyParentDirectories(parent);
  }
}

module.exports = { compileToJs };
