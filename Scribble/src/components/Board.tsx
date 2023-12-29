import { useEffect } from "react";
import { useState } from "react";
import React  , {useRef}  from 'react';
import { Socket, io  } from "socket.io-client";
import randomColor from 'randomcolor';

interface MyBoard {
    brushColor : string;
    brushSize  : number;
    eraserState : boolean;
}

const  Board: React.FC<MyBoard> = ({brushColor , brushSize , eraserState}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [room , setRoom] = useState<string>('');
    const [cursors, setCursors] = useState<{ [key: string]: { x: number; y: number } }>({});
    const [userColor, setUserColor] = useState<string>(randomColor());
    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        
        newSocket.on('connect' , () =>{
            console.log(newSocket , `Connection Establised`);
            
            setSocket(newSocket);
            
            
            
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

            socket?.on('cursorMoved', ({ userId, position }) => {
                setCursors((prevCursors) => ({
                    ...prevCursors,
                    [userId]: position,
                }));
            });

            socket?.on('userLeft' , (userId : string) =>{
                console.log(`user ${userId} left`);
                setCursors((prevCursors) =>{
                    const {[userId] : _, ...newCursors} = prevCursors;
                    return newCursors;
                })
                
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
                        ctx.globalCompositeOperation = 'destination-out';
                      } else {
                        ctx.globalCompositeOperation = 'source-over';
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
    }, [brushColor , brushSize , socket , eraserState , userColor , room]);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const rect = canvas?.getBoundingClientRect();

        if (canvas && rect && socket) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Emit cursor position to other users
            socket.emit('cursorMove', { x, y });

            // Update cursor position for the local user
            setCursors((prevCursors) => ({
                ...prevCursors,
                [socket.id]: { x, y },
            }));
        }
    };

    const createRoom  = () =>{
        const roomName = `room-${Math.floor(Math.random() * 1000)}${socket?.id}`;
        if(socket){
            socket.emit('joinRoom' , roomName);
        }
        setRoom(roomName);
        
        console.log(roomName);
        
    }
    const JoinRoom = () =>{
        const newRoom = prompt(`enter the room link to join`);
        
        
        if(socket){
            socket.emit('joinRoom' , String(newRoom));
        }
        if(newRoom){
            setRoom(newRoom);
        }
    }
    

    return (
        <>
        <div className="sketch">
        <canvas
        ref = {canvasRef}
        width={1000}
        height={800}
        style={{
            backgroundColor: 'white',
            cursor: eraserState ? 'url(/erasur.svg), auto' : 'url(/vite.svg), auto',
             
          }}

          onMouseMove={handleMouseMove}
   
        />
        
        <button onClick={createRoom} className="btn">Create Room</button>
        <button onClick={JoinRoom} className="btn">Join Room</button>
        {Object.entries(cursors).map(([userId, position]) => (
                    <div
                        key={userId}
                        style={{
                            position: 'absolute',
                            left: position.x,
                            top: position.y,
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background:userColor,
                            
                        }}
                    />
                ))}
        </div>
       
        
        </>
      )

    }

    export default Board;

















    
  
  

