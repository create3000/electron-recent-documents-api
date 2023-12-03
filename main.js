const { app, BrowserWindow, Menu } = require('electron')
const fs = require('node:fs')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

function createMenu ()
{
  const menu = Menu .buildFromTemplate ([
    {
      role: "appMenu",
      label: "Recent Document API Test",
    },
    {
       role: "fileMenu",
       submenu: [
          {
             role: "recentDocuments",
             submenu: [
                {
                   role: "clearRecentDocuments",
                },
             ],
          },
       ],
    }
  ]);

  Menu .setApplicationMenu (menu);
}

const fileName = 'recently-used.md'
fs.writeFile(fileName, 'Lorem Ipsum', () => {
  app.addRecentDocument(path.join(__dirname, fileName))
})

app.whenReady().then(createMenu)
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.clearRecentDocuments()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
