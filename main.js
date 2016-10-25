const {
  app,
  Tray,
  Menu,
  BrowserWindow,
  ipcMain
} = require('electron')
const path = require('path')
var open = require('open')
var AutoLaunch = require('auto-launch')

const iconPath = {
  'darwin': path.join(__dirname, 'icon-small.png'),
  'win': path.join(__dirname, 'favicon.ico')
}
let appIcon = null
let win = null
let notification = null

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

app.on('activate', () => {
  app.dock.setBadge('')
  win.show()
})

app.on('ready', () => {
  app.setLoginItemSettings({
    openAtLogin: true
  })


createNotification()

  win = new BrowserWindow({
    width: 1280,
    minWidth: 800,
    minHeight: 600,
    height: 800,
    show: true,
    frame: false
  })
  win.loadURL('https://web.comms.razerzone.com/')
  
  win.webContents.on('new-window', function (event, url) {
    event.preventDefault()
    open(url)
  })

  var contextMenu = Menu.buildFromTemplate([
    /* {
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
    }, */
    {
      label: 'Open Comms',
      accelerator: 'Alt+Command+I',
      click: function () {
        win.show()
      }
    }, {
      label: 'Toggle DevTools',
      accelerator: 'Alt+Command+I',
      click: function () {
        win.show()
        win.toggleDevTools()
      }
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:',
      click: function () {
        app.quit()
      }
    }
  ])

  // set dock icon
  appIcon = new Tray(iconPath[process.platform])
  appIcon.on('click', () => {
    app.dock.setBadge()
    win.isVisible() ? win.hide() : win.show()
  })
  appIcon.setToolTip('Razer Comms')
  appIcon.setContextMenu(contextMenu)
})

ipcMain.on('minimize_mainWindow', () => {
  console.log(arg) // prints "ping"
  win.minimize()
})

ipcMain.on('maximize_mainWindow', () => {
  if (process.platform != 'darwin') {
    win.isMaximized() ? win.unmaximize() : win.maximize()
  } else {
    win.setFullScreen(!win.isFullScreen())
  }
})

ipcMain.on('show_mainWindow', () => {
  win.show()
})

ipcMain.on('hide_mainWindow', () => {
  win.hide()
})

ipcMain.on('quit_app', (event, arg) => {
  console.log(event, arg) // prints "ping"
  app.quit()
})

ipcMain.on('show-notification', (event, arg) => {
  app.dock.setBadge('•')
  app.dock.bounce()

  showNotification(arg)

})

function createNotification() {
    notification = new BrowserWindow({
    show: false
  })

notification.loadURL(`file://${__dirname}/notification.html`)
notification.on('closed', () => {
  console.log('closed notification')
  notification = null
})
}

function showNotification(arg){
  notification.webContents.send('notification', arg)
}