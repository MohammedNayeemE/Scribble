import { useEffect } from "react";
import { useState } from "react";
import React  , {useRef}  from 'react';
import { Socket, io  } from "socket.io-client";
import ChatBox from "./ChatBox";
import PopModal from "./popmodel";
import Joinpopmodal from "./joinpopmodal";
import { ToastContainer, toast } from 'react-toastify';
import { getImage } from "../utility/image";
import 'react-toastify/dist/ReactToastify.css';
interface MyBoard {
    brushColor : string;
    brushSize  : number;
    eraserState : boolean;
    chatroom : boolean;
}
const customstyle = {
    backgroundImage: 'radial-gradient(rgb(192, 197, 206) 1px, white 1px)',
    backgroundSize:'15px 15px',
}
const  Board: React.FC<MyBoard> = ({brushColor , brushSize , eraserState , chatroom}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [imagedata , setimagedata] = useState('');
    const [room , setRoom] = useState<string>('');
    const [showModal , setShowModal] = useState<boolean>(false);
    const [joinshowModal , setjoinshowModal] = useState<boolean>(false);
    
    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        
        newSocket.on('connect' , () =>{
            console.log(newSocket , `Connection Establised`);
            
            setSocket(newSocket);
            
            
            
        })
        
        newSocket.on('disconnect' , ()=>{
            console.log(`user exited`);
            
        })
        
        return () =>{
            newSocket.disconnect();
        }

    }, []);

    

    
    useEffect(() => {

        if (socket) {
            // Event listener for receiving canvas data from the socket

            socket.on('canvasImage', (data:any) => {
                // Create an image object from the data URL
                const image = new Image();
                
                image.src = data;
                
                

                const canvas = canvasRef.current;
                // eslint-disable-next-line react-hooks/exhaustive-deps
                const ctx = canvas?.getContext('2d');
                // Draw the image onto the canvas
                image.onload = () => {
                    ctx?.drawImage(image, 0, 0);
                };
            });

            /*
            if (room) {
                // Join the specified room
                socket.emit('joinRoom', room);
            }*/

            // Listen for userJoined event to handle new users in the room
            socket?.on('userJoined', (userId: string) => {
                console.log(`User ${userId} joined the room`);
            });

            

            socket?.on('userLeft' , (userId : string) =>{
                console.log(`user ${userId} left`);
                
                
            })

            return () =>{
                socket.off('canvasImage');
                socket.off('userJoined');
                socket.off('userLeft');
                socket.off('cusrsorMoved');
            }


        }
    }, [socket]);
    
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
         const canvas: HTMLCanvasElement | null = canvasRef.current;
         const container = canvas?.parentElement;
         if(canvas && container){
         canvas.width = container.clientWidth;
         canvas.height = container.clientHeight   
        }

    },[])
    useEffect(() => {


        // Variables to store drawing state
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        const canvas: HTMLCanvasElement | null = canvasRef.current;
        const ctx = canvasRef.current?.getContext('2d');

       
        const startDrawing = (e: { offsetX: number; offsetY: number; }) => {
            isDrawing = true;

            console.log('drawing started' , brushColor , brushSize);
            
            [lastX, lastY] = [e.offsetX, e.offsetY];
        };


        // Function to draw
        const draw = (e: { offsetX: number; offsetY: number; }) => {
            if (!isDrawing) return;


            const canvas = canvasRef.current;
            if(canvas){
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                    if (eraserState) {
                       // ctx.globalCompositeOperation = 'destination-out';
                       ctx.strokeStyle = 'white';
                       ctx.lineWidth = brushSize;
                      } else {
                       // ctx.globalCompositeOperation = 'source-over';
                        ctx.strokeStyle = brushColor;
                        ctx.lineWidth = brushSize;
                      }
                    ctx.lineTo(e.offsetX, e.offsetY);
                    ctx.stroke();
                }
            }
            
            


            [lastX, lastY] = [e.offsetX, e.offsetY];
        };


        // Function to end drawing
        const endDrawing = () => {
            const canvas = canvasRef.current;
            const dataURL = canvas?.toDataURL();

            if(socket){
                socket.emit('canvasImage' , dataURL);
                console.log('drawing ended');
                
            }
            isDrawing = false;


        };


        


        // Set initial drawing styles
        if (ctx) {
            ctx.strokeStyle = brushColor;
            ctx.lineWidth = brushSize;


            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';


        }
        // Event listeners for drawing
        if(canvas){
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mouseout', endDrawing);
        }
        


        return () => {
            // Clean up event listeners when component unmounts
            if(canvas){
                canvas.removeEventListener('mousedown', startDrawing);
                canvas.removeEventListener('mousemove', draw);
                canvas.removeEventListener('mouseup', endDrawing);
                canvas.removeEventListener('mouseout', endDrawing);
            }
            
        };
    }, [brushColor , brushSize , socket  ,eraserState , room]);

    
    const CRnotify = () => toast.success("ROOM CREATED 😊");
    const JRnotify = () => toast.success("Joined Room");
    const ERnotify = () => toast.error('EXITED ROOM 🤡');
    const createRoom  = () =>{
        const roomName = `room-${Math.floor(Math.random() * 1000)}${socket?.id}`;
        if(socket){
            socket.emit('joinRoom' , roomName);
        }
        console.log(roomName);
        
        setRoom(roomName);
        CRnotify();
        setShowModal(true);
        
        
    }
    
    const joinRoomButtonHandler = () =>{
        
        setjoinshowModal(!joinshowModal);
    }

    const joinRoom = (roomid : string) =>{
        if(socket){
            socket.emit('joinRoom' , roomid);
        }
        if(roomid){
            setRoom(roomid);
        }
        JRnotify();
        
    }

    const sendMessage = (message:string) =>{
        console.log(message);
        
        if(socket && room){
            socket.emit('sendMessage' , message);
        }
    }
    
    const exit = () =>{
        if(socket){
            socket.disconnect();
            
        }
        ERnotify();
        
    }
    return (
        <>
        <ToastContainer/>
 <div className="sketch">
    
        <canvas 
         ref = {canvasRef}
        
        
        style={{
            background: 'radial-gradient(rgb(192, 197, 206) 1px, white 1px)',
            backgroundSize: '15px 15px',
            cursor: eraserState ? 'url(/erasur.svg), auto' : 'url(/vite.svg), auto',
             
          }}
        ></canvas>
       
    </div>
<div className="grid">
   
    <div style={{display:'flex'}}>
        <button onClick={createRoom} className="btn">Create Room</button>
        <button onClick={joinRoomButtonHandler} className="btn">Join Room</button>
        <button onClick={exit} className="btn">EXIT</button>
        
    </div>
        {
            chatroom ? <ChatBox sendMessage = {sendMessage} Socket = {socket} /> : <div></div>
        }
        
</div>
       
       {
        showModal ? <PopModal ShowState = {showModal} roomid = {room} /> : ''
       }
       {
         joinshowModal ? <Joinpopmodal ShowState={joinshowModal} JoinRoom={joinRoomButtonHandler} OnClick = {joinRoom}/> : ''
       }
        
        </>
      )
      
    }

    export default Board;

















    
  
  

