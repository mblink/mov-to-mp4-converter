const { dialog } = require('electron').remote; // eslint-disable-line import/no-extraneous-dependencies
const ffmpeg = require('./ffmpeg');

document.addEventListener('DOMContentLoaded', () => {
  const inputFile = document.getElementById('input-file');
  const outputFile = document.getElementById('output-file');
  const progress = document.getElementById('progress');
  const progressBar = progress.querySelector('.progress-bar');
  const success = document.getElementById('success');
  const errors = document.getElementById('errors');
  const convert = document.getElementById('convert');

  const hideAll = () => [progress, success, errors].forEach(el => (el.style.display = 'none'));

  const setInput = (movPath) => {
    inputFile.value = movPath;
    outputFile.value = movPath.replace(/\.mov$/, '.mp4');
  };

  document.getElementById('select-input').addEventListener('click', () => {
    hideAll();
    dialog.showOpenDialog({
      filters: [{ name: 'mov', extensions: ['mov'] }],
      properties: ['openFile', 'createDirectory']
    }, fileNames => fileNames && fileNames.length === 1 && setInput(fileNames[0]));
  });

  document.addEventListener('dragover', e => e.preventDefault());
  document.addEventListener('drop', e => e.preventDefault());
  document.body.addEventListener('drop', e =>
    e.dataTransfer.files.length === 1 && /\.mov$/.test(e.dataTransfer.files[0].path) &&
      setInput(e.dataTransfer.files[0].path));

  document.getElementById('select-output').addEventListener('click', () => {
    hideAll();
    dialog.showSaveDialog({
      filters: [{ name: 'mp4', extensions: ['mp4'] }]
    }, fileName => fileName && (outputFile.value = fileName));
  });

  convert.addEventListener('click', () => {
    convert.disabled = true;
    hideAll();
    progressBar.style.width = '0%';
    progress.style.display = 'block';
    ffmpeg.convert(inputFile.value, outputFile.value)
      .progress((pct) => {
        progressBar.style.width = `${pct}%`;
        progressBar.innerText = `${Math.round(pct)}%`;
      })
      .then(() => {
        success.innerText = 'Conversion complete';
        success.style.display = 'block';
      })
      .catch((err) => {
        console.error('FFMPEG ERROR:', err);
        errors.innerText = 'Failed to convert file';
        errors.style.display = 'block';
      })
      .then(() => {
        hideAll();
        convert.disabled = false;
      });
  });
});
