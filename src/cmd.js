const { spawn } = require('child_process');

module.exports = (bin, args) =>
  new Promise((resolve, reject) => {
    console.log('COMMAND:', bin, ...args);

    let stdout = '';
    let stderr = '';
    const cmd = spawn(bin, args);

    cmd.stdout.on('data', (data) => {
      stdout += `\n${data}`;
      console.log(`${bin.toUpperCase()} STDOUT:`, `${data}`);
    });

    cmd.stderr.on('data', (data) => {
      stderr += `\n${data}`;
      console.log(`${bin.toUpperCase()} STDERR:`, `${data}`);
    });

    cmd.on('close', code => (code === 0 ? resolve : reject)({ stdout, stderr, code }));
  });
