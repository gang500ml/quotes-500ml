require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const axios = require("axios")

const passport = require('passport')
const localstrategy = require('passport-local').Strategy
const githubstrategy = require('passport-github2').Strategy

const PORT = process.env.PORT || 8080

app.use('/', express.static(path.join(__dirname, 'public')))

var sess = {
  secret: 'quotes-500ml',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
// app.use(app.router);


app.get('/testconnectmongodb', (req, res) => {
console.log('testconnectmongodb', process.env.DATABASE)
var mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE, {auth:{authdb:"admin"}})
mongoose.set('debug', true)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('connected')
});
    res.send('ok')
})


app.get('/seed', (req, res) => {
    //var db = new sqlite3.Database(':memory:');
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

app.get('/getseeddata', (req, res) => {
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





app.listen(PORT, () => console.log(`Listening on ${PORT}!`))

