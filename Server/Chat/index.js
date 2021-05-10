const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/page.html')
});
io.on('connection', (Socket) => {
    console.log('a user connected');
    Socket.on('disconnect', ()=> {
        console.log('user disconnected');
    });
    Socket.on('chat message', (msg) =>{
        console.log('massage: ' + msg);
        io.emit('chat message', msg);
    })
    ;
})



server.listen(3000, () => {
    console.log('listening on *:3000');
});