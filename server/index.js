const express = require('express');
const socket = require('socket.io');

const app = express();
const port = 1234;

app.use(express.static('client'));
app.listen(port, () => {
    console.log(`Listening for connections on port ${port}`);
})