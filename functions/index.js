const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.getQuote = functions.https.onRequest((req, res) => {
    const quote = req.query.quote;
    return admin.database().ref('/candidates').push({id: '0', quote: quote}).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        return res.redirect(303, snapshot.ref.toString());
    });
});

exports.updateQuoteId = functions.database.ref('/quotes/{pushId}/quote')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      return snapshot.ref.parent.child('id').set(snapshot.numChildren());
    });