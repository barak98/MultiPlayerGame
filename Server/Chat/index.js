const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');


const { addUser, removeUser, getUser, getUsersInRoom, getUserByName, changeRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message,name, callback) => {
    const user = getUserByName(name);

    console.log(user);
    io.to(user.room).emit('message', { user: user.name, text: message });
    console.log();
    

    callback();
  });

  
  socket.on('sendMessagePrivateRoom', (message,name, callback) => {
    const user = getUserByName(name);

    console.log(user);
    io.to(user.room).emit('messagePrivateRoom', { user: user.name, text: message });
    console.log();
    

    callback();
  });

  socket.on('sendInviteGame', ({ name, privateRoom }, callback) => {
    console.log();


    changeRoom(name,privateRoom);

    const  currentUser  = getUserByName( name );

    socket.join(currentUser.room);

    io.to(currentUser.id).emit('goToGameRoom',{ user: currentUser.name, room:currentUser.room});

    socket.broadcast.to("main").emit('reciveInvite',currentUser.room);

  });

    socket.on('accepetInvite', ({ name, privateRoom }, callback) => {

      changeRoom(name,privateRoom);

      const  currentUser  = getUserByName( name );

    removeUser(currentUser);

    socket.join(currentUser.room);

    io.to(currentUser.id).emit('goToGameRoom',{ user: currentUser.name, room:currentUser.room});

    

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});



server.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));

