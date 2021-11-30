const {app, BrowserWindow} = require('electron');
const path = require('path');

function createWindow(params) {
    const app = new BrowserWindow({
        width:1200,
        heigh:800,
        backgroundColor: "white",
        webPreferences:{
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true
        }
    })
    app.loadFile(path.join(__dirname, 'index.html')); // unsure why we need the path.join, but index.html not found without it
}
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
})
app.whenReady().then(createWindow);