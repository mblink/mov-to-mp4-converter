const { path: ffmpegBin } = require('ffmpeg-static');
const { path: ffprobeBin } = require('ffprobe-static');
const ProgressPromise = require('progress-promise');
const progressStream = require('ffmpeg-progress-stream');
const runCmd = require('./cmd');

// The `replace` call is necessary to use the static binaries in the bundled .asar file
// https://stackoverflow.com/a/43389268/2163024
const ffmpeg = ffmpegBin.replace('app.asar', 'app.asar.unpacked');
const ffprobe = ffprobeBin.replace('app.asar', 'app.asar.unpacked');

module.exports = {
  getDuration(input) {
    return new Promise((resolve, reject) =>
      runCmd(ffprobe, ['-i', input, '-show_format', '-v', 'quiet'],
        stdout => console.log('FFPROBE STDOUT:', `${stdout}`),
        stderr => console.log('FFPROBE STDERR:', `${stderr}`),
        (code, stdout, stderr) =>
          (code === 0
            ? resolve(parseFloat(stdout[0].match(/^duration=([^\n]+)$/m)[1]))
            : reject(stderr))));
  },

  convert(input, output) {
    return new ProgressPromise((resolve, reject, progress) =>
      runCmd(ffmpeg, ['-i', input, '-vcodec', 'libx264', '-crf', `${window.crf || 18}`, '-y', output],
        stdout => console.log('FFMPEG STDOUT:', `${stdout}`),
        (stderr) => { progress(stderr); console.log('FFMPEG STDERR:', stderr); },
        code => (code === 0 ? resolve() : reject()),
        progressStream()));
  }
};
