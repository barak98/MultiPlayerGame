const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const PORT = 5000;
const INDEX = '/index.html';

const app = express()


const server = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}...`));

let dic = new Dictionary()

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
        console.log('in reqTurn')
        io.to(room).emit('playerTurn', data)
    })

    socket.on('create', room => {
        socket.join(room)
    })

    socket.on('join', room => {
        if(!(dic.isKeyIn(room))){
            socket.join(room);
            dic.add(room, 1);
        }
        else{
            if(dic.findAt(room) === 1){
            socket.join(room)
            dic.AddToValue(room);
            io.to(room).emit('opponent_joined')
            }
        }

    })

    socket.on('reqRestart', (data) => {
        const room = JSON.parse(data).room
        io.to(room).emit('restart')
    })
});


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
