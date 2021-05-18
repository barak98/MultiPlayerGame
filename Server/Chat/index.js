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
    console.log('connected');
    socket.on('message', ({name, message}) => {
        io.emit('message', {name, message});
    });

    socket.on("emitRandom", () => {
        console.log("in random");
        var rand1 =Math.floor (Math.random()*(6)+1)
        var rand2 = Math.floor(Math.random()*(6)+1)
        
        io.emit("randomNumber", rand1,rand2)
    })
});



http.listen(4000, function() {
    console.log('listening on pot 4000')
})