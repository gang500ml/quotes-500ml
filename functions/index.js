const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
var db = admin.firestore();

exports.addQuote = functions.https.onRequest((req, res) => {
    const quote = req.query.quote;
    const author = req.query.author;

    var counter = db.collection('counters').doc('quotes');
    var transaction = db.runTransaction(t => {
            return t.get(counter)
                .then(docC => {
                    var newCount = 1;
                    if (docC.exists) {
                        newCount += docC.data().count;
                    }
                    t.update(counter, { count: newCount });
                    var docRef = db.collection('quotes').doc(newCount.toString());
                    t.set(docRef, {author: author, quote: quote});
                });
    }).then(result => {
        res.status(200).end();
    }).catch(err => {
        console.log('Catch error: ', err);
        res.status(500).send('Internal Server Error!');
    });
});

exports.getQuote = functions.https.onRequest((req, res) => {
    var counter = db.collection('counters').doc('quotes');
    var getCounter = counter.get()
        .then(docC => {
            if (!docC.exists) {
                res.status(404).send('Not found-Counter!');
            } else {
                var id = Math.floor(Math.random() * docC.data().count) + 1;
                var docRef = db.collection('quotes').doc(id.toString());
                var getDoc = docRef.get()
                    .then(doc => {
                        if (!doc.exists) {
                            res.status(404).send('Not found-Quote!');
                        } else {
                            res.status(200).send(doc.data());
                        }
                    })
                    .catch(err => {
                        console.log('Catch error: ', err);
                        res.status(500).send('Internal Server Error!');
                    });

            }
        })
        .catch(err => {
            console.log('Catch error: ', err);
            res.status(500).send('Internal Server Error!');
        });
});
