const {app, Tray, Menu, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

const iconPath = path.join(__dirname, 'icon.png');
let appIcon = null;
let win = null;


const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

if (shouldQuit) {
  app.quit()
}


app.on('activate', ()=> win.show());

app.on('ready', ()=> {
  win = new BrowserWindow({width: 1280, minWidth:800, minHeight:600, height: 800, show: true, frame:false, icon: "./favicon.ico"});
  win.loadURL("https://web.comms.razerzone.com/");

 
  
  var contextMenu = Menu.buildFromTemplate([
    /*{
      label: 'Item2',
      submenu: [
        { label: 'submenu1' },
        { label: 'submenu2' }
      ]
    },
    {
      label: 'Item3',
      type: 'radio',
      checked: false
    },
    {
      label: 'Toggle DevTools',
      accelerator: 'Alt+Command+I',
      click: function() {
        win.show();
        win.toggleDevTools();
      }
    },*/
    { label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:',
      click: function() {
        app.quit();
      }
    }
  ]);
  /*
  appIcon = new Tray(iconPath);
  appIcon.on('click', () => {
  win.isVisible() ? win.hide() : win.show()
})
  appIcon.setToolTip('Razer Comms');
  appIcon.setContextMenu(contextMenu);\
  */
});

ipcMain.on('minimize_mainWindow', (event, arg) => {
  console.log(arg)  // prints "ping"
  win.minimize();
});

ipcMain.on('maximize_mainWindow', (event, arg) => {
  console.log(arg)  // prints "ping"
  win.isMaximized() ? win.unmaximize() : win.maximize();
});

ipcMain.on('show_mainWindow', (event, arg) => {
  console.log(arg)  // prints "ping"
  win.show();
});

ipcMain.on('hide_mainWindow', (event, arg) => {
  console.log(arg)  // prints "ping"
  win.hide();
});

ipcMain.on('quit_app', (event, arg) => {
  console.log(arg)  // prints "ping"
  app.quit();
});

ipcMain.on('show-notification', (event, arg) => {
    console.log(arg);
    appIcon.displayBalloon({
        icon: arg.icon,
        title: arg.name,
        content: arg.message
    });
});