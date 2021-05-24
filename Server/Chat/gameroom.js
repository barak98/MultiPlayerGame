const usersInRoom = [];

const addUserToGameRoom = ({ id, name, room }) => {
    
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if(!name || !room) return { error: 'Username and room are required.' };
  if(usersInRoom.length == 1) return { error: 'Room is full.' };

  const user = { id, name, room };

  usersInRoom.push(user);

  return { user };
}

const removeUserFromGameRoom = (id) => {
  const index = usersInRoom.findIndex((user) => user.id === id);

  if(index !== -1) return usersInRoom.splice(index, 1)[0];
}

const getUserToGameRoom = (id) => usersInRoom.find((user) => user.id === id);

const getUsersInGameRoom = (room) => usersInRoom.filter((user) => user.room === room);

module.exports = { addUserToGameRoom, removeUserFromGameRoom, getUserToGameRoom, getUsersInGameRoom };