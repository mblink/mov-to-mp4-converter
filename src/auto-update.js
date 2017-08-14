const { BrowserWindow } = require('electron'); // eslint-disable-line import/no-extraneous-dependencies
const isDev = require('electron-is-dev');

const log = (logFn, ...args) =>
  (typeof logFn === 'function'
    ? logFn('AUTO UPDATER:', ...args)
    : console.log('AUTO UPDATER:', logFn, ...args));

const notify = (title, message) => {
  const windows = BrowserWindow.getAllWindows();
  if (windows.length === 0) {
    log(console.error, 'No browser windows found');
  }

  windows[0].webContents.send('notify', title, message);
};

module.exports = (autoUpdater) => {
  if (isDev) { return; }

  autoUpdater.on('checking-for-update', () => log('Checking for update'));
  autoUpdater.on('update-available', info => log('Update available', info));
  autoUpdater.on('update-not-available', info => log('No update available', info));
  autoUpdater.on('error', err => log(console.error, err));
  autoUpdater.on('download-progress', progress =>
    log(`Download speed: ${progress.bytesPerSecond}
      Downloaded: ${progress.percent}% (${progress.transferred} / ${progress.total})`.replace(/^\s+/gm, '')));
  autoUpdater.on('update-downloaded', (info) => {
    log('Update downloaded', info);
    notify('Update available', `Version ${info.version} will be automatically installed on quit`);
  });

  autoUpdater.checkForUpdates();
};
