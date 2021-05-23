const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const PORT = 5000;
const INDEX = '/index.html';

const app = express()


const server = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}...`));

// socket server
const socket = require('socket.io');
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on('connection', (socket) => {
    socket.on('reqTurn', (data) => {
        const room = JSON.parse(data).room
        io.to(room).emit('playerTurn', data)
    })

    socket.on('create', room => {
        socket.join(room)
    })

    socket.on('join', room => {
        socket.join(room)
        io.to(room).emit('opponent_joined')
    })

    socket.on('reqRestart', (data) => {
        const room = JSON.parse(data).room
        io.to(room).emit('restart')
    })
});
