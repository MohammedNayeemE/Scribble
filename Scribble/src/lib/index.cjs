const {Server} = require('socket.io');

const io = new Server({
    cors: "http://localhost:5173/"
})
io.on('connection' , (socket) => {
    socket.on('canvasImage' , (data) => {
        socket.broadcast.emit('canvasImage' , data);
    })
})

io.listen(5000 ,  () => {
    console.log('Server Started at 5000');
});
