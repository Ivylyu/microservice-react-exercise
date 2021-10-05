const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// This service is for watch for events
app.post('/event', (req, res) => {

});

app.listen(4003, () => {
    console.log('Listeninng on 4003!');
});