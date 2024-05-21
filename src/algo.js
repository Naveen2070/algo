const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const readline = require('readline');
const { compileToJs } = require('./Compilers/js/compiler');
const { compileToPython } = require('./Compilers/python(In-Hold)/compiler');
const packageJson = require('../package.json');

// Function to read configuration from config.lang file
function readConfig(directory, callback) {
  const configPath = path.join(directory, 'config.lang');
  fs.readFile(configPath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // No config file found, use default values
        callback({
          Language: 'JavaScript',
          Format: 'js',
          Version: 'default',
          OutFolder: 'output',
          Mode: 'Production',
        });
      } else {
        console.error('Error reading config file:', err);
      }
      return;
    }

    const config = {};
    data
      .trim()
      .split('\n')
      .forEach((line) => {
        const [key, value] = line.split('=');
        config[key.trim()] = value.trim();
      });

    callback(config);
  });
}

// Function to recursively find all .alg files in a directory
function findAllAlgFiles(directory, callback) {
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file.name);

      if (file.isDirectory()) {
        // Skip output and OutFolder directories
        if (file.name !== 'output' && file.name !== 'OutFolder') {
          findAllAlgFiles(filePath, callback);
        }
      } else if (file.isFile() && file.name.endsWith('.alg')) {
        callback(filePath);
      }
    });
  });
}

program
  .command('clean')
  .description('Delete log and temp folders in compilers directory')
  .action(() => {
    cleanCompilersDirectory();
  });

program
  .version(packageJson.version, '-v, --version')
  .arguments('<file>')
  .description('Compile and execute .alg files.')
  .action((file) => {
    const filePath = path.resolve(file);
    const directory = path.dirname(filePath);

    readConfig(directory, (config) => {
      const language = String(config.Language);

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      function promptUser() {
        const promptMessage = `Selected Language:${language}
Select Mode (Convert or 1/Run or 2): `;

        rl.question(promptMessage, (outputType) => {
          if (
            ['1', '2', 'Convert', 'convert', 'Run', 'run'].includes(outputType)
          ) {
            findAllAlgFiles(directory, (filePath) => {
              fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                  console.error('Error reading file:', err);
                  return;
                }

                if (language.toLowerCase() === 'javascript') {
                  compileToJs(
                    data,
                    outputType,
                    path.basename(filePath, '.alg'),
                    filePath,
                    directory,
                    config
                  );
                } else if (language.toLowerCase() === 'under-work') {
                  compileToPython(
                    data,
                    outputType,
                    path.basename(filePath, '.alg'),
                    config
                  );
                } else {
                  console.error('Unsupported language:', config.Language);
                }
              });
            });

            rl.close();
          } else {
            console.error(
              'Invalid option. Please select 1, 2, Convert, or Run.'
            );
            promptUser(); // Prompt again for valid input
          }
        });
      }

      promptUser();
    });
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ algo script.alg');
    console.log('  $ algo clean');
    console.log('  $ algo --help');
    console.log('  $ algo -v');
  });

program.parse(process.argv);

function cleanCompilersDirectory() {
  const compilersDir = path.join(__dirname, 'Compilers');
  fs.readdir(compilersDir, (err, files) => {
    if (err) {
      console.error('Error reading compilers directory:', err);
      return;
    }

    files.forEach((compiler) => {
      const compilerPath = path.join(compilersDir, compiler);
      if (
        fs.existsSync(compilerPath) &&
        fs.statSync(compilerPath).isDirectory()
      ) {
        const logFolder = path.join(compilerPath, 'log');
        const tempFolder = path.join(compilerPath, 'temp');

        deleteFolder(logFolder);
        deleteFolder(tempFolder);
      }
    });
  });
}

function deleteFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.rm(folderPath, () => true);
    console.log(`Deleted ${folderPath}`);
  }
}
