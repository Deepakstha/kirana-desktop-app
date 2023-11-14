const sqlite = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, '../sqlite.db')
const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    return console.log(err)
  } else {
    console.log('Connection success')
  }
})

// db.run(`CREATE TABLE users(firstname , lastname)`)
// const sql = `INSERT INTO users(firstname, lastname) VALUES (?,?)`
// db.run(sql, ['Deepak', 'Shrestha'])

exports.db = db

// const row = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
// console.log(row.firstName, row.lastName, row.email)
