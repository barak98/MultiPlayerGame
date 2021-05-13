const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const io = require("socket.io")(http, {
    cors: {
        origin: '*',
    }
  });

app.use(cors())

io.on('connection', socket => {
    socket.on('message', ({name, message}) => {
        io.emit('message', {name, message});
    });

    socket.on('emitRandom', () => {
        console.log("in random");
        io.emit('randomNumber', Math.random()*6)
    })
});



http.listen(4000, function() {
    console.log('listening on pot 4000')
})