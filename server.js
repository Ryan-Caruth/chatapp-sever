const express = require("express");
const app = express();
const http = require("http");
//Need to create a server wrapped inside http.createServer()
const server = http.createServer(app);
const { Server } = require("socket.io");

//Use socketio variable to emit and recieve messages to clients
const io = new Server(server);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("disconnect", () => {
    console.log(`user disconnected with id: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
