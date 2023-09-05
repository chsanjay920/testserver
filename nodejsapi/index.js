const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const server = http.createServer(app);

// Enable CORS for the Socket.io server
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'], // Add the HTTP methods you need
  },
});

const PORT = process.env.PORT || 8000;

// Enable CORS for Express
app.use(cors());
app.get('/sayhai', (req, res) => {
    res.send({
        data: "sanjay"
    });
});

// Rest of your server code...

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chatmessage', (msg) => {
    console.log(`Message: ${msg}`);
    io.emit('chat message', msg); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
