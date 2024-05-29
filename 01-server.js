const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;
const message = process.env.WELCOME_MESSAGE || 'Bienvenue sur mon application!';
const mongoUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongodb-service:27017`;

let db;

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    db = client.db('test');
    app.listen(port, () => {
        console.log(`Application démarrée sur http://localhost:${port}`);
    });
});

app.get('/', (req, res) => {
    db.collection('messages').insertOne({ message }, (err, result) => {
        if (err) throw err;
        res.send(message);
    });
});