const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');


const { addUser, removeUser, getUser, getUsersInRoom, getUserByName, changeRoom } = require('./users');
const { addUserToGameRoom, removeUserFromGameRoom, getUserToGameRoom, getUsersInGameRoom } = require("./gameroom");

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
let dic = new Dictionary()

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

  socket.on('joinPrivateRoom',(name)=>{

    const user = getUserByName(name);
    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  })

  
  socket.on('sendMessagePrivateRoom', (message,name) => {
    const user = getUserByName(name);
    io.to(user.room).emit('messagePrivateRoom', { user: user.name, text: message });   
  });

  socket.on('sendInviteGame', ({ name, privateRoom,selectedUser }, callback) => {
    console.log();


    changeRoom(name,privateRoom);

    const  currentUser  = getUserByName( name );
    const  toUser = getUserByName(selectedUser);

    
    if(currentUser.id == toUser.id) return callback('you can send invite to your self.');

    socket.join(currentUser.room);

    io.in(currentUser.id).emit('goToGameRoom',{ user: currentUser.name, room:currentUser.room});

    socket.to(toUser.id).emit('reciveInvite',currentUser.room);

  });

    socket.on('accepetInvite', ({ name, privateRoom }, callback) => {

      changeRoom(name,privateRoom);

      const  currentUser  = getUserByName( name );

      console.log("currentUser");
      console.log(currentUser);

    socket.join(currentUser.room);

    io.in(currentUser.id).emit('goToGameRoom',{ user: currentUser.name, room:currentUser.room});

    

    callback();
  });

  socket.on('reqTurn', (data) => {
    const room = JSON.parse(data).room
    console.log('in reqTurn')
    io.to(room).emit('playerTurn', data)
})


socket.on('joinGame' ,(room , name) => {
  if(!(dic.isKeyIn(room))){
      dic.add(room, 1);
      const  currentUser  = getUserByName( name );

      io.to(currentUser.id).emit("first player settings")
  }
  else{
      if(dic.findAt(room) === 1){
      dic.AddToValue(room);
      const  currentUser  = getUserByName( name );
      io.to(currentUser.id).emit("second player settings")
      }

      io.to(room).emit('opponent_joined')
  }

})
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })


});



server.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));


function Dictionary(){
  this.dataStore =[];


  this.add = function(key ,value){
      if(key && value){
          this.dataStore.push({
              key: key,
              value: value
          })
          return this.dataStore;
      }
  };

  this.removeAt = function(key){
      for (let i = 0; i<this.dataStore.length;i++){
          if(this.dataStore[i].key === key)
              this.dataStore.splice(this.dataStore[i],1)
      }
  };

  this.isKeyIn = function(key){
      for(let i = 0; i<this.dataStore.length;i++){
          if(this.dataStore[i].key === key)
          return true;
      }
      return false;
  };

  this.findAt = function(key){
      for(let i = 0; i<this.dataStore.length;i++){
          if (this.dataStore[i].key===key){
              return this.dataStore[i].value
          }
      }
  };

  this.AddToValue = function(key){
      this.dataStore.forEach(e => {
          if(e.key === key)
              e.value = 2;
      });
  };
}
