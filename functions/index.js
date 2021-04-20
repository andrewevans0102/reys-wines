require('dotenv').config();
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser')();
app.use(cors({ origin: true }));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// copied from the firebase repo example at
// https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js
const validateFirebaseIdToken = async (req, res, next) => {
    functions.logger.log(
        'Check if request is authorized with Firebase ID token'
    );

    if (
        (!req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)
    ) {
        functions.logger.error(
            'No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.'
        );
        res.status(403).send('Unauthorized');
        return;
    }

    let idToken;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        functions.logger.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        functions.logger.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        functions.logger.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        next();
        return;
    } catch (error) {
        functions.logger.error(
            'Error while verifying Firebase ID token:',
            error
        );
        res.status(403).send('Unauthorized');
        return;
    }
};

app.use(validateFirebaseIdToken);

// twilio
const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// setup the API to have admin privlages
// this uses the builtin FIREBASE_CONFIG environment variables and a JSON file pulled from the console
// https://firebase.google.com/docs/functions/config-env
// https://firebase.google.com/docs/admin/setup#initialize-sdk
const serviceAccount = require('./service_account/permissions.json');
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(adminConfig);

const db = admin.firestore();

app.get('/api/health', (req, res) => {
    res.status(200).send("rey's wines is working correctly");
});

app.post('/api/share', async (req, res) => {
    try {
        const wineName = req.body.wineName;
        const locationPurchased = req.body.locationPurchased;
        const wineRating = req.body.wineRating;
        const downloadURL = req.body.downloadURL;
        const phone = req.body.phone;
        const notes = req.body.notes;
        const userId = req.body.userId;

        let profileDocument = db
            .collection(`user/${userId}/profile`)
            .doc('/0/');
        const userProfile = await profileDocument.get();
        console.log(userProfile.data());

        let stars = '';
        for (let i = 0; i < parseInt(wineRating); i++) {
            stars = stars + ' ⭐️';
        }

        const message =
            '🍷 🍷  Wines with ReyRey! 🐈 🐈' +
            '\n \n' +
            `${userProfile.data().firstName} ${
                userProfile.data().lastName
            } \n` +
            'is sharing the following wine with you:' +
            '\n \n' +
            `Name: ${wineName}` +
            '\n \n' +
            `Location Purchased: ${locationPurchased}` +
            '\n \n' +
            `Rating: ${stars}` +
            '\n \n' +
            `Notes: \n` +
            `${notes}` +
            '\n \n' +
            'and checkout the above image too!';

        const clientRequest = {
            body: message,
            from: process.env.TWILIO_PHONE,
            mediaUrl: [downloadURL],
            to: phone,
        };

        await client.messages.create(clientRequest);

        res.status(200).send('wine was successfully shared!');
        // res.status(200).send(clientRequest);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

exports.app = functions.https.onRequest(app);
