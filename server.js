const socketIO = require('socket.io');
const io = socketIO(undefined,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

const clients = {};

io.on('connection', (socket) => {
    const clientIP = socket.handshake.address;
    console.log(`Client connected: ${clientIP}`);

    // Store the socket for the client with the same IP address
    if (!clients[clientIP]) {
        clients[clientIP] = [];
    }
    clients[clientIP].push(socket);

    socket.on('message', (data) => {
        // Broadcast the message to all sockets with the same IP address
        clients[clientIP].forEach((clientSocket) => {
            clientSocket.emit('message', data);
        });
    });

    socket.on('disconnect', () => {
        // Remove the socket from the clients list when disconnected
        const index = clients[clientIP].indexOf(socket);
        if (index !== -1) {
            clients[clientIP].splice(index, 1);
        }
    });
});

io.listen(3000, () => {
    console.log('Server is running on port 3000');
});