// The `replace` call is necessary to use ffmpeg-static in the bundled .asar file
// https://stackoverflow.com/a/43389268/2163024
const { path: ffmpegBin } = require('ffmpeg-static');

const ffmpeg = ffmpegBin.replace('app.asar', 'app.asar.unpacked');

const runCmd = require('./cmd');

module.exports = {
  convert(input, output) {
    return runCmd(ffmpeg, ['-i', input, '-vcodec', 'libx264', '-crf', `${window.crf || 18}`, '-y', output]);
  }
};
