const { app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const fs = require('fs');
const np = require('node-pty');
// replacement for node-pty
// const cp = require('child_process'); 
const os = require('os');
// react developer tools for electron in dev mode 
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
// global bool to determine if in dev mode or not 
const isDev = true; 

//Dynamic variable to change terminal type based on os
const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

// Add react dev tools to electron app 
if (isDev) {
    app.whenReady().then(() => {
        installExtension(REACT_DEVELOPER_TOOLS, {
            loadExtensionOptions: {
                allowFileAccess: true,
            },
        })
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));
    });
};


// setup electron window 
function createWindow(params) {
    const app = new BrowserWindow({
        width:1550,
        heigh:800,
        backgroundColor: "white",
        webPreferences:{
            nodeIntegration: true, // changed to true from legacy to resolve an issue with OpenFolderButton
            worldSafeExecuteJavaScript: true,
            contextIsolation: false, // changed to false from legacy to resolve an issue with OpenFolderButton
            webviewTag: true // Electron recommends against using webview, which is why it is disabled by default - could instead build with BrowserView or iframe
        }
    })
    app.loadFile(path.join(__dirname, 'index.html')); // unsure why we need the path.join, but index.html not found without it


    // PTY PROCESS FOR IN APP TERMINAL
    const ptyArgs = {
        name: 'xterm-color',
        cols: 80,
        rows: 80,
        cwd: process.env.HOME,
        env: process.env,
    };
    console.log("process.env.HOME: ", process.env.HOME);

    const ptyProcess = np.spawn(shell, [], ptyArgs);
    // with ptyProcess, we want to send incoming data to the channel terminal.incData
    ptyProcess.on('data', (data) => {
        app.webContents.send('terminal.incData', data);
    });
    // in the main process, at terminal.toTerm channel, when data is received,
    // main process will write to ptyProcess
    ipcMain.on('terminal.toTerm', (event, data) => {
        ptyProcess.write(data);
    });

    //  CHILD PROCESS SOLUTION?? NOT WORKING 
    // const ptyArgs = {
    //     name: 'xterm-color',
    //     cols: 80,
    //     rows: 80,
    //     cwd: process.env.HOME,
    //     env: process.env,
    // };
    // console.log("process.env.HOME: ", process.env.HOME);

    // // is shell the right argument? 
    // const ptyProcess = cp.spawn(shell, [], ptyArgs);
    // console.log('ptyProcess:'); 
    // console.log(ptyProcess); 
    // // with ptyProcess, we want to send incoming data to the channel terminal.incData
    // ptyProcess.stdout.on('data', (data) => {
    //     console.log('event was caught, this is inside ptyProcess.stdout.on data'); 
    //     console.log('data:'); 
    //     console.log(data); 
    //     app.webContents.send('terminal.incData', data);
    // });
    // // in the main process, at terminal.toTerm channel, when data is received,
    // // main process will write to ptyProcess
    // ipcMain.on('terminal.toTerm', (data) => {
    //     console.log('event was caught, this is inside ipcMain.on(terminal.toTerm)');
    //     console.log('data:');
    //     console.log(data);
    //     ptyProcess.stdin.write(data);
    // });
}

// not 100% sure what this is doing 
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
}); 


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