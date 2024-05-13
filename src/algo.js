#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const readline = require('readline');
const { compile } = require('./Compilers/js/compiler');

// Function to read configuration from config.lex file
function readConfig(directory, callback) {
  const configPath = path.join(directory, 'config.lex');
  fs.readFile(configPath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // No config file found, use default values
        callback({ Language: 'Js', Version: 'default' });
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

    readConfig(fileDir, (config) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        const promptMessage = `Select output type (${config.Language} or 1/output or 2): `;

        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        rl.question(promptMessage, (outputType) => {
          compile(data, outputType, config);
          rl.close();
        });
      });
    });
  });

program.parse(process.argv);
