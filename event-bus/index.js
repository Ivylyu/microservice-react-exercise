const axios = require('axios');
const express = require('express');

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
    const event = req.body;
    console.log(req.body);
    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);
    axios.post('http://localhost:4003/events', event);

    res.send('ok');
});

app.listen(4005, () => {
    console.log('Listening on 4005!');
});