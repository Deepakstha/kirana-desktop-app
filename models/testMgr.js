const dbManager = require('./dbManager')
const db = dbManager.db

exports.getNames = () => {
  const sql = 'SELECT * FROM test'
  let stmt = db.prepare(sql)
  let res = stmt.all()
  return res
}
