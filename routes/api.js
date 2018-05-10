var express = require('express');
var router = express.Router();
const db = require('../db/postgres');

router.get('/getquote', function(req, res, next) {
    
    // cors(req, res, () => {
    //     var counter = db.collection('counters').doc('quotes');
    //     var getCounter = counter.get()
    //     .then(docC => {
    //         if (!docC.exists) {
    //             res.status(404).send('Not found-Counter!');
    //         } else {
    //             var id = Math.floor(Math.random() * docC.data().count) + 1;
    //             var docRef = db.collection('quotes').doc(id.toString());
    //             var getDoc = docRef.get()
    //                 .then(doc => {
    //                     if (!doc.exists) {
    //                         res.status(404).send('Not found-Quote!');
    //                     } else {
    //                         res.status(200).send(doc.data());
    //                     }
    //                 })
    //                 .catch(err => {
    //                     console.log('Catch error: ', err);
    //                     res.status(500).send('Internal Server Error!');
    //                 });

    //         }
    //     })
    //     .catch(err => {
    //         console.log('Catch error: ', err);
    //         res.status(500).send('Internal Server Error!');
    //     }); 
    // });
    
    const text = "SELECT table_schema,table_name FROM information_schema.tables;";
    const values = [];
    db.query(text, values, (err, ret) => {
        if (err) {
console.log(err);
            //res.redirect('/404')
        }
        if (ret.rows[0]) {
console.log(ret.rows);
            //res.render('ccadmin/account-edit', ret.rows[0])
        } else {
console.log(db.emptyRow(ret));
            //res.render('ccadmin/account-edit', db.emptyRow(ret))
        }
    });
});

router.post('/addquote', function(req, res, next) {
    
    // const quote = req.query.quote;
    // const author = req.query.author;

    // var counter = db.collection('counters').doc('quotes');
    // var transaction = db.runTransaction(t => {
    //         return t.get(counter)
    //             .then(docC => {
    //                 var newCount = 1;
    //                 if (docC.exists) {
    //                     newCount += docC.data().count;
    //                 }
    //                 t.update(counter, { count: newCount });
    //                 var docRef = db.collection('quotes').doc(newCount.toString());
    //                 t.set(docRef, {author: author, quote: quote});
    //             });
    // }).then(result => {
    //     res.status(200).end();
    // }).catch(err => {
    //     console.log('Catch error: ', err);
    //     res.status(500).send('Internal Server Error!');
    // });
    
    
    
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
