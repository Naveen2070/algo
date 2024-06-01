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
  const lines = code.split('\n');
  let jsCode = '';

  let currentFunction = { name: '', params: [] };

  for (let line of lines) {
    line = line.trim();
    jsCode += processFunction(line, currentFunction);
  }

  jsCode = importChecker(jsCode, config, outputType);

  const logData = {
    timestamp: new Date().toISOString(),
    localTimestamp: getLocalTimestamp(),
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
    const relativePath = path.relative(directory, filePath);
    const outFolder = config.OutFolder || 'output';
    const outputFolderPath = path.join(
      directory,
      outFolder,
      path.dirname(relativePath)
    );
    if (!fs.existsSync(outputFolderPath)) {
      fs.mkdirSync(outputFolderPath, { recursive: true });
    }

    const outputFile = path.parse(filePath);
    const outputFileName = path.join(outputFolderPath, `${outputFile.name}.js`);
    fs.writeFileSync(outputFileName, jsCode);
    logData.result = `JavaScript file generated: ${outputFileName}`;

    logToFile(logData);
  } else if (
    outputType === 'Run' ||
    outputType === 'run' ||
    outputType === '2'
  ) {
    const relativePath = path.relative(directory, filePath);
    const tempFolder = path.join(__dirname, 'temp', path.dirname(relativePath));
    if (!fs.existsSync(tempFolder)) {
      fs.mkdirSync(tempFolder, { recursive: true });
    }

    let tempFileName;
    if (fileName) {
      const outputFile = path.parse(fileName);
      tempFileName = path.join(tempFolder, `${outputFile.name}.js`);
    } else {
      tempFileName = path.join(tempFolder, `temp_${Date.now()}.js`);
    }

    fs.writeFileSync(tempFileName, jsCode);
    logData.tempFilePaths = [tempFileName];

    executeTempFiles(logData.tempFilePaths, logData);
  }
}

function logToFile(data) {
  const logFolder = path.join(__dirname, 'log');
  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder);
  }
  const logFilePath = path.join(logFolder, 'log.json');
  let logEntries = [];

  if (fs.existsSync(logFilePath)) {
    const existingLogData = fs.readFileSync(logFilePath, 'utf-8');
    logEntries = JSON.parse(existingLogData);
  }

  logEntries.push(data);

  fs.writeFileSync(logFilePath, JSON.stringify(logEntries, null, 2) + os.EOL);
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

function executeTempFiles(tempFilePaths, logData) {
  if (!tempFilePaths || tempFilePaths.length === 0) {
    console.error('No temporary files to execute.');
    return;
  }

  const { exec } = require('child_process');
  const tempFilePath = tempFilePaths[0]; // Ensure only the first file is executed

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

    try {
      fs.unlinkSync(tempFilePath);
      removeEmptyParentDirectories(path.dirname(tempFilePath));
    } catch (err) {
      console.error(`Error deleting temporary file: ${err.message}`);
    }

    logToFile(logData);
  });
}

module.exports = { compileToJs };
