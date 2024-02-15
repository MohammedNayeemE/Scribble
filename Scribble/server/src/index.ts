// import express from 'express';
// import { CLIENT_URL } from '../constant';
// import cors from 'cors';
// import { Auth } from '../routes';
// import { errorHandler } from '../middleware/errorHandler';
// import { Server } from 'socket.io';

// interface Room{
//     [key : string] : string
// }

// const app = express();
// const PORT = process.env.PORT || 8000;
// app.use(cors(
//    {
//     origin : CLIENT_URL,
    
//    } 

// ))
// app.use(express.json());
// app.use(errorHandler);
// app.use(Auth.BASE_URL , Auth.router);

// const server = app.listen(()=>{
//     console.log(`server is running at port * ${PORT}`);
    
// })

// const io = new Server(server , {
//     cors : {
//         origin : CLIENT_URL
//     }
// })
// const rooms : Room  = {};
// io.on('connection' , (socket) => {

//     socket.on('joinRoom' , (room) =>{
//         socket.join(room);
//         rooms[socket.id] = room;

//         io.to(room).emit('userJoined' , socket.id);

//         socket.on('cursorMove', (position) => {
//             io.to(rooms[socket.id]).emit('cursorMoved', { userId: socket.id, position });
            
//         });

//     })
//     socket.on('canvasImage' , (data) => {
//         io.to(rooms[socket.id]).emit('canvasImage' , data);
        
        
        
//     })

//     socket.on('sendMessage' , (message) =>{

//         io.to(rooms[socket.id]).emit('message', { userid: socket.id, chat : message });
//         console.log(rooms); 
        
//     });
    


//     socket.on('disconnect', () => {
//         const room = rooms[socket.id];
//         if (room) {
//             io.to(room).emit('userLeft', socket.id);
//             //@ts-ignorets
//             delete rooms[socket.id];
//         }
//         console.log(rooms);
//     });                                                                                                                                                                         


// })



