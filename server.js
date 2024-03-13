const Server = require('socket.io').Server;
const io = new Server({
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
    maxHttpBufferSize: 1e8
  });

const clients = {};

io.on('connection', (socket) => {

    socket.on('message', (data) => {
        // Broadcast the message to everyone
        io.emit('message', data);
        // socket.broadcast.emit('message', data);
    });
});

io.listen(3000, () => {
    console.log('Server is running on port 3000');
});