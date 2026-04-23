const { registerChatEvents } = require('./chat');
const { registerGameEvents } = require('./game');

function initSockets(io) {
  io.on('connection', (socket) => {
    console.log('user connected:', socket.id);

    registerChatEvents(io, socket);
    registerGameEvents(io, socket);

    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
    });
  });
}

module.exports = { initSockets };