const io = require('socket.io')(3000, {
    cors: {
        origin: "*"
    }
});

var users = {

};

io.on('connection', socket => {
    console.log('New client connected');

    socket.on('message', msg => {
        socket.broadcast.emit('message', `${users[socket.id]}: ${msg}`);
    });

    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('new-user', name);
        console.log(users);
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('message', `${users[socket.id]} disconnected`);
        //delete users[socket.id];
    })
})



