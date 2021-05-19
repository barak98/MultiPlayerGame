const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 4000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log("we have a new connection!");
  socket.on('join',({name,room})=>{
    console.log(name,room);
  })

  socket.on('disconnect', ()=>{
    console.log('User had left!');
  })
});

app.use(router);

// // Join user to chat
// const users = [];

// app.use(express.json());
// app.post("/userJoin", (req, res) => {
//   console.log(req.body);
//   let userName = req.body.username;
//   let userEmail = req.body.emailName;
//   let userPassword = req.body.UserId;

//   let user = { userName, userEmail, userPassword };

//   users.push(user);
//   console.log(users);
//   res.send();
// });

server.listen(PORT, function () {
  console.log(`listening on pot ${PORT}`);
});
