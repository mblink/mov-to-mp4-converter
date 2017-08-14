const { app, BrowserWindow, Menu } = require('electron'); // eslint-disable-line import/no-extraneous-dependencies
const { autoUpdater } = require('electron-updater');
const autoUpdate = require('./auto-update');
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
  createWindow('index.html', { width: 600, height: 450 });
  autoUpdate(autoUpdater);
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
