const axios = require('axios');
const express = require('express');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    const event = req.body;
    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4001/events', event);
    // axios.post('http://localhost:4002/events', event);

    res.send('ok');
});

app.listen(4005, () => {
    console.log('Listening on 4005!');
});