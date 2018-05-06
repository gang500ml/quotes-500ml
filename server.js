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

const apiRouter = require('./routes/api')
const testRouter = require('./routes/test')

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

app.use('/api', apiRouter)
app.use('/test', testRouter)

app.listen(PORT, () => console.log(`Listening on ${PORT}!`))

