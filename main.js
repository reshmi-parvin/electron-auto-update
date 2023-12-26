const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'reshmi-parvin',
    repo: 'electron-auto-update',
});
app.whenReady().then(() => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify(); // Check for updates on app start

    app.on('activate', function () {
        if (mainWindow === null) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// Auto-update events
autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
    console.log('Update available:', info);
});

autoUpdater.on('update-not-available', () => {
    console.log('No update available.');
});

autoUpdater.on('error', (err) => {
    console.error('Error in auto-updater:', err);
});

autoUpdater.on('download-progress', (progressObj) => {
    console.log(`Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}%`);
});

autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded:', info);
    autoUpdater.quitAndInstall();
});
