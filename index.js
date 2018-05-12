const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const axios = require('axios');

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());
server.post('/logThis', (req, res) => {
    const msgToLog = req.body;
    console.log('Body:', req.body);
    axios.post('http://logs-01.loggly.com/inputs/15c04c38-2a23-415c-a692-880ab55fc95d/tag/loggly-jslogger', {
        msgToLog
    })
    .then((response) => {
        return res.json({
            result: "Success"
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            result: "Error",
            details: error
        });
    });
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});