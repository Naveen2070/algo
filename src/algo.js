#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const readline = require('readline');
const { compile } = require('./Compilers/js/compiler');

program
  .version('1.0.0')
  .arguments('<file>')
  .description('Compile and execute .alg files.')
  .action((file) => {
    const filePath = path.resolve(file);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(
        'Select output type (js or 1/output or 2): ',
        (outputType) => {
          compile(data, outputType);
          rl.close();
        }
      );
    });
  });

program.parse(process.argv);
