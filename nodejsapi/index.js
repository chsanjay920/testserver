const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;


const io = require('socket.io')(8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.on('connection', socket => {
    socket.on('clientconnect', data => {
        console.log("clientConnected", data);
    });
});

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
const corsMiddleware = cors(corsOptions);
app.use(corsMiddleware);

app.get('/sayhai', (req, res) => {
    res.send({
        data: "sanjay"
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
