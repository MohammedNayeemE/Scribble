const {Server} = require('socket.io');

const io = new Server({
    cors: "http://localhost:5173/"
});
const rooms = {};
io.on('connection' , (socket) => {

    socket.on('joinRoom' , (room) =>{
        socket.join(room);
        rooms[socket.id] = room;

        io.to(room).emit('userJoined' , socket.id);

        socket.on('cursorMove', (position) => {
            io.to(rooms[socket.id]).emit('cursorMoved', { userId: socket.id, position });
            
        });

    })
    socket.on('canvasImage' , (data) => {
        io.to(rooms[socket.id]).emit('canvasImage' , data);
        console.log(rooms);
        
    })

    socket.on('disconnect', () => {
        const room = rooms[socket.id];
        if (room) {
            io.to(room).emit('userLeft', socket.id);
            delete rooms[socket.id];
        }
    });


})

io.listen(5000 ,  () => {
    console.log('Server Started at 5000');
});
