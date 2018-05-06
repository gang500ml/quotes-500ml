const { Pool } = require('pg')
const con = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true
})

let db = {}

db.query = (sql, params, callback) => {
  con.connect()
  .then(client => {
    return client.query(sql, params)
      .then(res => {
        client.release()
        callback(null, res)
      })
      .catch(err => {
        client.release()
        callback(err, null)
      })
  })

}

db.emptyRow = (res) => {
  var ret = {}
  res.fields.forEach(r => {
    ret[r.name] = ""
  })
  return ret
}

module.exports = db
