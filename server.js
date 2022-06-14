const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
//Need to create a server wrapped inside http.createServer()
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use(cors());

//Use socketio variable to emit and recieve messages to clients
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log(`user connected with: ${socket.id}`);

  //Allow socket.io to join a room
  socket.on("join-room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  //Create a socket.io event to send the message to the server.
    socket.on("send-message", (data) => {  
        //Emit the message to the server and people in the room
        socket.to(data.room).emit("receive-message", data);
    })

  socket.on("disconnect", () => {
    console.log(`user disconnected with id: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
