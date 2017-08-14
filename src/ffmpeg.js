const { path: ffmpegBin } = require('ffmpeg-static');
const { path: ffprobeBin } = require('ffprobe-static');
const ProgressPromise = require('progress-promise');
const progressStream = require('ffmpeg-progress-stream');
const runCmd = require('./cmd');
const { timeStrToSec } = require('./util');

// The `replace` call is necessary to use the static binaries in the bundled .asar file
// https://stackoverflow.com/a/43389268/2163024
const ffmpeg = ffmpegBin.replace('app.asar', 'app.asar.unpacked');
const ffprobe = ffprobeBin.replace('app.asar', 'app.asar.unpacked');

const maxWidth = 1920;
const maxHeight = 1088;

const ensureDivisibleBy2 = num => (num % 2 === 0 ? num : num - 1);

module.exports = {
  getInfo(input, successCb, errorCb) {
    runCmd(ffprobe, ['-i', input, '-show_streams', '-v', 'quiet', '-print_format', 'json'],
      stdout => console.log('FFPROBE STDOUT:', `${stdout}`),
      stderr => console.log('FFPROBE STDERR:', `${stderr}`),
      (code, stdout) => {
        if (code === 0) {
          const ret = JSON.parse(stdout[0]).streams[0];
          ret.duration = parseFloat(ret.duration);
          successCb(ret);
        } else {
          errorCb();
        }
      });
  },

  convert(input, output) {
    return new ProgressPromise((resolve, reject, progress) =>
      this.getInfo(input, ({ width, height, duration }) => {
        const opts = ['-i', input, '-vcodec', 'libx264', '-crf', `${window.crf || 18}`, '-y'];
        if (width > maxWidth || height > maxHeight) {
          opts.push('-vf');
          opts.push(width > height
            ? `scale=${ensureDivisibleBy2(Math.round((maxHeight / height) * width))}:${maxHeight}`
            : `scale=${maxWidth}:${ensureDivisibleBy2(Math.round((maxWidth / width) * height))}`);
        }
        opts.push(output);

        runCmd(ffmpeg, opts,
          stdout => console.log('FFMPEG STDOUT:', `${stdout}`),
          (stderr) => {
            console.log('FFMPEG STDERR:', stderr);
            progress((timeStrToSec(stderr.time) / duration) * 100);
          },
          code => (code === 0 ? resolve() : reject()),
          progressStream());
      }, reject));
  }
};
