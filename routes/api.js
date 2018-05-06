var express = require('express')
var router = express.Router()
const db = require('../db/postgres')

router.get('/test', function(req, res, next) {
    const text = "SELECT table_schema,table_name FROM information_schema.tables;";
    const values = [];
    db.query(text, values, (err, ret) => {
        if (err) {
console.log(err)
            //res.redirect('/404')
        }
        if (ret.rows[0]) {
console.log(ret.rows)
            //res.render('ccadmin/account-edit', ret.rows[0])
        } else {
console.log(db.emptyRow(ret))
            //res.render('ccadmin/account-edit', db.emptyRow(ret))
        }
    })
})

router.post('/', function(req, res, next) {
  res.send('respond with a resource')
  
    // const text = "SELECT * FROM account WHERE account_id = $1";
    // const values = [request.query.aid];
    // db.query(text, values, (err, ret) => {
    // if (err) {
    // response.redirect('/pages/404'); //may need to change to an error page
    // }
    // if (ret.rows[0]) {
    // response.render('ccadmin/account-edit', ret.rows[0]);
    // } else {
    // //console.log(db.emptyRow(ret));
    // response.render('ccadmin/account-edit', db.emptyRow(ret));
    // }
    // });
        
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
