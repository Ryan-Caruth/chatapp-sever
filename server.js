const express = require('express');
const http = require('http');
const socketio = require('socket.io');
//Need to create a server wrapped inside http.createServer()

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello world, soon this will be a chat app");
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



