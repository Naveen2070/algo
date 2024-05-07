#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const { compile } = require('./compiler');

program
  .version('1.0.0')
  .arguments('<file>')
  .description('Compile and execute .alg files.')
  .option(
    '-o, --output <type>',
    'Output type: js (JavaScript file) or output (direct output)'
  )
  .action((file, options) => {
    const filePath = path.resolve(file);
    const outputType = options.output || 'output';

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      compile(data, outputType);
    });
  });

program.parse(process.argv);
