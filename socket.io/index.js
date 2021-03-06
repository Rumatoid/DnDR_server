module.exports = function(server) {
  const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
  } = require('./../users.js');

  const socketio = require('socket.io');

  const io = socketio(server);

  io.on('connection', socket => {
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });

      if (error) return callback(error);

      socket.join(user.room);
      socket.to(user.room).emit('newUser');

      socket.emit('message', {
        user: 'admin',
        text: `${user.name}, welcome to room ${user.room}.`
      });
      socket.broadcast
        .to(user.room)
        .emit('message', { user: 'admin', text: `${user.name} has joined!` });

      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      });

      callback();
    });

    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit('message', { user: user.name, text: message });

      callback();
    });

    socket.on('emitChangeColor', (value, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit('changeColor', value);
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('message', {
          user: 'Admin',
          text: `${user.name} has left.`
        });
        io.to(user.room).emit('roomData', {
          room: user.room,
          users: getUsersInRoom(user.room)
        });
      }
    });
  });
};
