const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



const express = require('express');
const cors = require('cors');
const stripe = require('stripe')
('sk_test_51I3mSaCNPiewcnuRcuegrc04ZavhHs71DvluVb7LUl62BbTktgXiE2HqLB1SeG1b3vnlGQ6vczin0ehfhGrSr23R0040r9Vkb4')

//API



// App config

const app = express();


//Middlewares
app.use(cors({ origin: true}));
app.use(express.json());

//API routes
app.get('/',(req,res)=>{
    res.status(200).send('hello world')
})

app.post('/payments/create', async(req,res)=>{
    const total = req.query.total;

    console.log('Payment Request Recieved BOOM!! for this amount >>>', total);
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,  // subunits of the currency
        currency: "inr"
    });

    // OK - created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    });
})

//Listen command
exports.api = functions.https.onRequest(app);


//Example endpoint
// http://localhost:5001/clone-f6475/us-central1/api