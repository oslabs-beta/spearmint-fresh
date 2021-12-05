const { app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const fs = require('fs');
// global bool to determine if in dev mode or not 
const isDev = true; 




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


/*
UNIVERSAL IPC CALLS
(The following IPC calls are made from various components in the codebase)
*/
ipcMain.on('Universal.stat', (e, filePath) => {
    e.returnValue = fs.statSync(filePath).isDirectory();
});

ipcMain.on('Universal.readDir', (e, projectFilePath) => {
    e.returnValue = fs.readdirSync(projectFilePath, (err) => {
        if (err) throw err;
    });
});

ipcMain.on('Universal.readFile', (e, filePath) => {
    e.returnValue = fs.readFileSync(filePath, 'utf8', (err) => {
        if (err) throw err;
    });
});

ipcMain.on('Universal.path', (e, folderPath, filePath) => {
    e.returnValue = path.relative(folderPath, filePath, (err) => {
        if (err) throw err;
    });
}); 

/*
  EXPORTFILEMODAL.JSX FILE FUNCTIONALITY
  (check existence and create folder)
*/
ipcMain.on('ExportFileModal.exists', (e, fileOrFolderPath) => {
    e.returnValue = fs.existsSync(fileOrFolderPath, (err) => {
        if (err) throw err;
    });
});

ipcMain.on('ExportFileModal.mkdir', (e, folderPath) => {
    e.returnValue = fs.mkdirSync(folderPath, (err) => {
        if (err) throw err;
    });
});

ipcMain.on('ExportFileModal.fileCreate', (e, filePath, file) => {
    e.returnValue = fs.writeFile(filePath, file, (err) => {
        if (err) throw err;
    });
});

ipcMain.on('ExportFileModal.readFile', (e, filePath) => {
    e.returnValue = fs.readFileSync(filePath, 'utf8', (err) => {
        if (err) throw err;
    });
});


// OPENFOLDERBUTTON.JSX FILE FUNCTIONALITY
ipcMain.on('OpenFolderButton.isDirectory', (e, filePath) => {
    e.returnValue = fs.statSync(filePath).isDirectory();
});

ipcMain.on('OpenFolderButton.dialog', (e) => {
    const dialogOptions = {
        properties: ['openDirectory', 'createDirectory'],
        filters: [
            { name: 'Javascript Files', extensions: ['js', 'jsx'] },
            { name: 'Style', extensions: ['css'] },
            { name: 'Html', extensions: ['html'] },
        ],
        message: 'Please select your project folder',
    };
    e.returnValue = dialog.showOpenDialogSync(dialogOptions);
});


app.whenReady().then(createWindow);