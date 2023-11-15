import { app, shell, BrowserWindow, ipcMain } from 'electron'
// import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const { db } = require('../../models/dbManager')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      // contextIsolation: true,
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  db.close((err) => {
    if (err) {
      return console.log(err)
    }
  })
})

// Adding Supplyer to the Database
ipcMain.handle('addSupplyer', (event, args) => {
  const checking = `SELECT * FROM supplyers WHERE supplyer_name = ? LIMIT 1`
  let message

  return new Promise((resolve, reject) => {
    db.get(checking, [args.supplyerName], (err, row) => {
      if (err) {
        reject(err)
      }
      if (row) {
        message = 'Supplyer already exists'
        resolve(message)
      } else {
        const sql = `INSERT INTO supplyers(supplyer_name, supplyer_address, supplyer_contact) VALUES (?,?,?)`
        db.run(
          sql,
          [args.supplyerName, args.supplyerAddress, args.supplyerContact],
          function (err) {
            if (err) {
              return console.log(err.message)
            }
            message = `Supplyer Added`
            resolve(message)
          }
        )
      }
    })
  })
})

//Displaying Supplyer data to the renderer
ipcMain.handle('displaySupplyer', async (event, args) => {
  let sql = `SELECT * FROM supplyers`
  let supplyers = 0

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        supplyers = rows
        resolve(supplyers)
      }
    })
  })
})

//Sending supplyer info to editsupplyer page
ipcMain.handle('editSupplyer', async (event, args) => {
  let sql = `SELECT * FROM supplyers WHERE sup_id = ? LIMIT 1`
  return new Promise((resolve, reject) => {
    db.all(sql, [args], (err, row) => {
      if (err) {
        reject(err)
      }
      if (row) {
        resolve(row)
      }
    })
  })
})

//Updating supplyer info
ipcMain.handle('updateSupplyer', async (event, args) => {
  let sql = `UPDATE supplyers SET supplyer_name = ?, supplyer_address = ?, supplyer_contact = ? WHERE sup_id = ?`
  return new Promise((resolve, reject) => {
    db.run(
      sql,
      [args.supplyerName, args.supplyerAddress, args.supplyerContact, args.sup_id],
      function (err) {
        if (err) {
          reject(err)
        } else {
          resolve('Supplier updated')
        }
      }
    )
  })
})

//Delete supplyer
ipcMain.handle('deleteSupplyer', async (event, args) => {
  let sql = `DELETE FROM supplyers WHERE sup_id = ?`
  return new Promise((resolve, reject) => {
    db.run(sql, [args], function (err) {
      if (err) {
        reject(err)
      } else {
        resolve('Supplyer deleted')
      }
    })
  })
})

//Search Supplyer
ipcMain.handle('searchSupplyer', async (event, args) => {
  let sql = `SELECT * FROM supplyers WHERE supplyer_name LIKE ? OR supplyer_address LIKE ? OR supplyer_contact LIKE ?`

  return new Promise((resolve, reject) => {
    db.all(sql, [args, args, args], function (err, rows) {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
})

// Adding Customer to the Database
ipcMain.handle('addCustomer', (event, args) => {
  const checking = `SELECT * FROM customer WHERE customer_contact = ? LIMIT 1`
  let message

  return new Promise((resolve, reject) => {
    db.get(checking, [args.customerContact], (err, row) => {
      if (err) {
        reject(err)
      }
      if (row) {
        message = 'Customer already exists'
        resolve(message)
      } else {
        const sql = `INSERT INTO customer(customer_name, customer_address, customer_contact) VALUES (?,?,?)`
        db.run(
          sql,
          [args.customerName, args.customerAddress, args.customerContact],
          function (err) {
            if (err) {
              return console.log(err.message)
            }
            message = `Customer Added`
            resolve(message)
          }
        )
      }
    })
  })
})

// Displaying Customer data to the table
ipcMain.handle('displayCustomer', async (event, args) => {
  let sql = `SELECT * FROM customer`

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
})

// Sending Customer info to editCustomer page
ipcMain.handle('editCustomer', async (event, args) => {
  let sql = `SELECT * FROM customer WHERE cus_id=?`
  return new Promise((resolve, reject) => {
    db.all(sql, [args], (err, row) => {
      if (err) {
        reject(err)
      } else if (row) {
        resolve(row)
      }
    })
  })
})

// Updating Customer info
ipcMain.handle('updateCustomer', async (event, args) => {
  let sql = `UPDATE customer SET customer_name = ?, customer_address = ?, customer_contact = ? WHERE cus_id = ?`
  return new Promise((resolve, reject) => {
    db.run(
      sql,
      [args.customerName, args.customerAddress, args.customerContact, args.cus_id],
      function (err) {
        if (err) {
          reject(err)
        } else {
          resolve('Customer Updated')
        }
      }
    )
  })
})

// Delete Customer
ipcMain.handle('deleteCustomer', async (event, args) => {
  let sql = `DELETE FROM customer WHERE cus_id = ?`
  return new Promise((resolve, reject) => {
    db.run(sql, [args], function (err) {
      if (err) {
        reject(err)
      } else {
        resolve('Customer deleted')
      }
    })
  })
})

// Searching Customr
ipcMain.handle('searchCustomer', async (event, args) => {
  let sql = `SELECT * FROM customer WHERE customer_name LIKE ? OR customer_address LIKE ? OR customer_contact LIKE ?`
  return new Promise((resolve, reject) => {
    db.all(sql, [args, args, args], function (err, rows) {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
})

// add new category in database
ipcMain.handle('addCategory', async (event, args) => {
  const checking = `SELECT * FROM category WHERE category_name = ? LIMIT 1`
  let message
  return new Promise((resolve, reject) => {
    db.get(checking, [args], (err, row) => {
      if (err) {
        reject(err)
      }
      if (row) {
        message = 'Category already exists'
        resolve(message)
      } else {
        const sql = `INSERT INTO category(category_name) VALUES (?)`
        db.run(sql, [args], function (err) {
          if (err) {
            reject(err)
          } else {
            message = `Category Added`
            resolve(message)
          }
        })
      }
    })
  })
})

// Display Category data to the table
ipcMain.handle('displayCategory', async (event, args) => {
  let sql = `SELECT * FROM category`
  return new Promise((resolve, reject) => {
    db.all(sql, [], (error, row) => {
      if (error) {
        reject(error)
      } else {
        resolve(row)
      }
    })
  })
})

// Sending Category info to edit category page
ipcMain.handle('editCategory', async (event, args) => {
  let sql = `SELECT * FROM category WHERE cat_id = ?`
  return new Promise((resolve, reject) => {
    db.all(sql, [args], (err, row) => {
      if (err) {
        reject(err)
      } else if (row) {
        resolve(row)
      }
    })
  })
})

// update category
ipcMain.handle('updateCategory', async (event, args) => {
  let sql = `UPDATE category SET category_name = ? WHERE cat_id = ?`
  return new Promise((resolve, reject) => {
    db.run(sql, [args.categoryName, args.cat_id], (err) => {
      if (err) {
        reject(err)
      } else {
        resolve('Category Updated')
      }
    })
  })
})

// Delete Category
ipcMain.handle('deleteCategory', async (event, args) => {
  let sql = `DELETE FROM category WHERE cat_id=?`
  return new Promise((resolve, reject) => {
    db.run(sql, [args], (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(`Category Deleted`)
      }
    })
  })
})

// Search Category
ipcMain.handle('searchCategory', async (event, args) => {
  let sql = `SELECT * FROM category WHERE category_name LIKE ?`
  return new Promise((resolve, reject) => {
    db.all(sql, [args], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
})

// Add Product to the database
ipcMain.handle('addProduct', (event, args) => {
  const checking = `SELECT * FROM products WHERE product_name = ?`
  let message

  return new Promise((resolve, reject) => {
    db.get(checking, [args.productName], (err, row) => {
      if (err) {
        reject(err)
      }
      if (row) {
        message = 'Product already Exist'
        resolve(message)
      } else {
        const sql = `INSERT INTO products(product_name,product_category,product_supplyer,product_quantity,product_price,supplyer_id) VALUES (?,?,?,?,?,?)`
        db.run(
          sql,
          [
            args.productName,
            args.category,
            args.supplyer.supplyer_name,
            args.quantity,
            args.price,
            args.supplyer.sup_id
          ],
          (err) => {
            if (err) {
              reject(err)
            } else {
              message = 'Product Added'
              resolve(message)
            }
          }
        )
      }
    })
  })
})
