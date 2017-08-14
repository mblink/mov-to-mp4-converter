const electronLog = require('electron-log');
const isDev = require('electron-is-dev');

const log = (logFn, ...args) =>
  (typeof logFn === 'function'
    ? logFn('AUTO UPDATER:', ...args)
    : electronLog.info('AUTO UPDATER:', logFn, ...args));

module.exports = {
  check: autoUpdater => new Promise((resolve, reject) => {
    if (isDev) {
      reject('No updates in dev');
    } else {
      autoUpdater.logger = electronLog;
      autoUpdater.logger.transports.file.level = 'info';

      autoUpdater.on('checking-for-update', () => log('Checking for update'));
      autoUpdater.on('update-available', info => log('Update available', info));
      autoUpdater.on('update-not-available', (info) => { log('No update available', info); reject(info); });
      autoUpdater.on('error', (err) => { log(electronLog.error, err); reject(err); });
      autoUpdater.on('download-progress', progress =>
        log(`Download speed: ${progress.bytesPerSecond}
          Downloaded: ${progress.percent}% (${progress.transferred} / ${progress.total})`.replace(/^\s+/gm, '')));
      autoUpdater.on('update-downloaded', (info) => { log('Update downloaded', info); resolve(info); });

      autoUpdater.checkForUpdates();
    }
  }),

  install: autoUpdater => autoUpdater.quitAndInstall()
};
