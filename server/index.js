const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if(error) return callback(error);
    socket.join(user.room);
    socket.emit('message', { text: `${user.name}, welcome to room ${user.room}`});
    socket.broadcast.to(user.room).emit('message', {  text: `${user.name} joined!` });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const date = new Date();
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message , time: date.toLocaleTimeString() });
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('message', { text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});
server.listen(process.env.PORT || 5000, () => console.log(`server running`));