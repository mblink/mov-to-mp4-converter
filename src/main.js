// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow, dialog, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');
const autoUpdate = require('./auto-update');
const log = require('electron-log');
require('electron-debug')({ enabled: true });

const path = require('path');
const url = require('url');

// Global reference of the window object, to prevent the window from
// being closed automatically when the JS object is garbage collected
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 600, height: 450 });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', () => {
  const menu = Menu.buildFromTemplate([{
    label: app.getName(),
    submenu: [
      { label: 'About', role: 'about' },
      { label: 'Quit', accelerator: 'Command+Q', click: app.quit.bind(app) }
    ]
  }]);
  Menu.setApplicationMenu(menu);

  createWindow();

  autoUpdate.check(autoUpdater)
    .then(update =>
      dialog.showMessageBox(mainWindow, {
        type: 'question',
        buttons: ['Install', 'Cancel'],
        title: 'Update available',
        message: `A new version (v${update.version}) of the app has been downloaded and is ready for installation.` +
          "\n\nClick 'Install' to install now, or click 'Cancel' to install when you quit the app.",
        icon: path.join(__dirname, 'icon.png')
      }, (btnIdx) => {
        if (btnIdx === 0) {
          app.removeAllListeners('window-all-closed');
          mainWindow.close();
          setTimeout(() => autoUpdate.install(autoUpdater), 5);
        }
      }))
    .catch(err => log.warn('Not installing update:', err));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
