const {app, BrowserWindow} = require('electron');
const path = require('path');

function createWindow(params) {
    const app = new BrowserWindow({
        width:1200,
        heigh:800,
        backgroundColor: "white",
        webPreferences:{
            nodeIntegration: true, // changed to true from legacy to resolve an issue with OpenFolderButton
            worldSafeExecuteJavaScript: true,
            contextIsolation: false // changed to false from legacy to resolve an issue with OpenFolderButton
        }
    })
    app.loadFile(path.join(__dirname, 'index.html')); // unsure why we need the path.join, but index.html not found without it
}
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
})
app.whenReady().then(createWindow);