const io = require('socket.io')(5000)

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})

//
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ users: [] }).write();


app.post("/AddUser",(req,res)=>{
  db.get("users")
  // .find({id: req.body.id})
  .assign({
    password : passwordVal,
    email : emailVal ,
    name: nameVal,
  })
  .write();
})


app.get("/GetUsers", (req, res) => {
  res.send(db.get("users").value());
});
