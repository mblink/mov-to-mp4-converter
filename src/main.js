const { app, BrowserWindow } = require('electron'); // eslint-disable-line import/no-extraneous-dependencies
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

app.on('ready', createWindow);

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
