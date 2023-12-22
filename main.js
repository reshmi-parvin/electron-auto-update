const { app, BrowserWindow, autoUpdater } = require('electron')
const {autoUpdater} = require('electron-updater')
const log = require('electron-log')
log.log('Application version:'+ app.getVersion());
log.transports.file.resolvePath = () => path.join('D:/electron-auto-update/package.json', '/logs/main.log');
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadFile('index.html')
  }
  app.whenReady().then(() => {
    createWindow()
    autoUpdater.checkForUpdates();
  })

  autoUpdater.on('update-available', (info) =>{
    log.info('update-available');
  })
  
  autoUpdater.on('checking-for-update', () =>{
    log.info('checking-for-update');
  })
  
  autoUpdater.on('update-available', (info) =>{
    log.info('update-available');
  })
  
  autoUpdater.on('error', (err) =>{
    log.info('error'+ err);
  })
  
  autoUpdater.on('download-progress', (progressTrack) =>{
    log.info('download-progress'+ progressTrack);
  })

  autoUpdater.on('update-downloaded', (info) =>{
    log.info('update-downloaded');
  })