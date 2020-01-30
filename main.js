const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const path = require("path");

function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.removeMenu();
    //BrowserWindow.addDevToolsExtension(`./extension/`);
    // and load the index.html of the app.
    win.loadURL('http://localhost:3000/landing');
}

app.on('ready', () => createWindow());

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
    app.quit()
}
})