#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const readline = require('readline');
const { compileToJs } = require('./Compilers/js/compiler');
const { compileToPython } = require('./Compilers/python(In-Hold)/compiler');

// Function to read configuration from config.lang file in the root directory
function readConfig(callback) {
  const configPath = path.resolve('/', 'config.lang');
  fs.readFile(configPath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // No config file found, use default values
        callback({
          Language: 'JavaScript',
          Format: 'js',
          Version: 'default',
          Coversion: 'default',
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

program
  .version('1.0.0')
  .arguments('<file>')
  .description('Compile and execute .alg files.')
  .action((file) => {
    const filePath = path.resolve(file);
    const fileDir = path.dirname(filePath);

    readConfig((config) => {
      fs.readdir(fileDir, (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          return;
        }

        const algFiles = files.filter(
          (f) => f.endsWith('.alg') && f !== 'output'
        );

        algFiles.forEach((algFile) => {
          const fullPath = path.join(fileDir, algFile);
          fs.readFile(fullPath, 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading file:', err);
              return;
            }
            const language = String(config.Language);
            const format = String(config.Format);

            const outputType = 'convert'; // Default to convert mode

            if (language.toLowerCase() === 'javascript') {
              compileToJs(
                data,
                outputType,
                algFile.replace('.alg', ''),
                config
              );
            } else if (language.toLowerCase() === 'under-work') {
              compileToPython(
                data,
                outputType,
                algFile.replace('.alg', ''),
                config
              );
            } else {
              console.error('Unsupported language:', config.Language);
            }
          });
        });
      });
    });
  });

program.parse(process.argv);
