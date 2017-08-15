const { path: ffmpegBin } = require('ffmpeg-static');
const { path: ffprobeBin } = require('ffprobe-static');
const ffprobe = require('ffprobe');
const ProgressPromise = require('progress-promise');
const progressStream = require('ffmpeg-progress-stream');
const runCmd = require('./cmd');
const util = require('./util');

// The `replace` call is necessary to use the static binaries in the bundled .asar file
// https://stackoverflow.com/a/43389268/2163024
const ffmpeg = ffmpegBin.replace('app.asar', 'app.asar.unpacked');
const ffprobePath = ffprobeBin.replace('app.asar', 'app.asar.unpacked');

const maxWidth = 1920;
const maxHeight = 1088;

module.exports = {
  getInfo(input, successCb, errorCb) {
    ffprobe(input, { path: ffprobePath }, (err, info) => {
      if (err) {
        errorCb(err);
      } else {
        const ret = info.streams[0];
        ret.duration = parseFloat(ret.duration);
        successCb(ret);
      }
    });
  },

  convert(input, output) {
    return new ProgressPromise((resolve, reject, progress) =>
      this.getInfo(input, ({ width, height, duration }) => {
        const opts = ['-i', input, '-vcodec', 'libx264', '-crf', `${window.crf || 18}`, '-y'];
        if (width > maxWidth || height > maxHeight) {
          opts.push('-vf');
          const dims = util.fitToMaxDimensions(width, height, maxWidth, maxHeight);
          opts.push(`scale=${dims[0]}:${dims[1]}`);
        }
        opts.push(output);

        runCmd(ffmpeg, opts,
          stdout => console.log('FFMPEG STDOUT:', `${stdout}`),
          (stderr) => {
            console.log('FFMPEG STDERR:', stderr);
            progress((util.timeStrToSec(stderr.time) / duration) * 100);
          },
          code => (code === 0 ? resolve() : reject()),
          progressStream());
      }, reject));
  }
};
