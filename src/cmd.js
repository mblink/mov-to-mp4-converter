const log = require('electron-log');
const { spawn } = require('child_process');

module.exports = (bin, args, onStdout, onStderr, onClose, pipeStderr) => {
  log.info('COMMAND:', bin, ...args);

  const stdout = [];
  const stderr = [];
  const cmd = spawn(bin, args);

  cmd.stdout.on('data', (data) => {
    stdout.push(`${data}`);
    if (typeof onStdout === 'function') { onStdout(data); }
  });

  (typeof pipeStderr !== 'undefined' ? cmd.stderr.pipe(pipeStderr) : cmd.stderr)
    .on('data', (data) => {
      stderr.push(`${data}`);
      if (typeof onStderr === 'function') { onStderr(data); }
    });

  cmd.on('close', code => onClose(code, stdout, stderr));
};
