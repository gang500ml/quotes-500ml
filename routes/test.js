var express = require('express')
var router = express.Router()
const db = require('../db/postgres')

router.get('/', function(req, res, next) {
    const sql = "SELECT table_schema,table_name FROM information_schema.tables;";
    const values = [];
    db.query(sql, values, (err, ret) => {
        var json
        if (err) {
console.log(err.stack)
            json = JSON.stringify({})
        } else if (ret.rows[0]) {
            json = JSON.stringify(ret.rows)
        } else {
            json = JSON.stringify(db.emptyRow(ret))
        }
//res.render('ccadmin/account-edit', ret.rows[0])
        res.writeHead(200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)})
        res.end(json)
//console.log(json)
    })
})


router.get('/seed', (req, res) => {
    db.serialize(function() {
        db.run("CREATE TABLE users (uname TEXT, upass TEXT, provider TEXT)")
        
        var stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?)")
        for (var i = 0; i < 10; i++) {
            stmt.run("mr_"+i, i, "email")
        }
        stmt.finalize()
    })
    db.close()
})

router.get('/getseeddata', (req, res) => {
    var result = ""
    db.serialize(function() {
        db.each("SELECT rowid AS id, uname, upass, provider FROM users",
            //retrieved row by row
            function(err, row) {
                result += row.id + ": " + row.uname + " " + row.upass + "<br/>" ;
            },
            //complete
            function() {
                console.log(result)
                res.send(result)
            })
    })
    db.close()
})


module.exports = router
