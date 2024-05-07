export function compile(code, outputType) {
  // Split the code into lines
  const lines = code.split('\n');
  let jsCode = '';

  for (let line of lines) {
    line = line.trim();

    // Check for keywords
    if (line.startsWith('Start')) {
      jsCode += '// Compiled JavaScript code\n';
    } else if (line.startsWith('Const')) {
      const [_, variable, value] = line.match(/Const (\w+)\s*=\s*(.+)/);
      jsCode += `const ${variable} = ${value}\n`;
    } else if (line.startsWith('Let')) {
      const [_, variable, value] = line.match(/Let (\w+)\s*=\s*(.+)/);
      jsCode += `let ${variable} = ${value}\n`;
    } else if (line.startsWith('For')) {
      const [_, variable, range] = line.match(/For (\w+)\s+in\s+range\s+(.+)/);
      jsCode += `for (let ${variable} = 0; ${variable} < ${range}; ${variable}++) {\n`;
    } else if (line.startsWith('return')) {
      const [_, value] = line.match(/return\s+(.+)/);
      jsCode += `    return ${value}\n`;
    } else if (line.startsWith('End')) {
      jsCode += '}\n';
    }
  }

  if (outputType === 'js' || outputType === '1') {
    fs.writeFileSync('output.js', jsCode);
    console.log('JavaScript file generated: output.js');
  } else {
    const func = new Function(jsCode);
    const result = func();
    console.log('Output:', result);
  }
}
