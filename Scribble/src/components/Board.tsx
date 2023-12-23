import { useEffect } from "react";
import { useState } from "react";
import React  , {useRef}  from 'react';
import { Socket, io  } from "socket.io-client";

interface MyBoard {
    brushColor : string;
    brushSize  : number;
    eraserState : boolean;
}

const  Board: React.FC<MyBoard> = ({brushColor , brushSize , eraserState}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    
    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        console.log(newSocket, "Connected to socket");
        setSocket(newSocket);
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
    }, [brushColor , brushSize , socket , eraserState]);


    

    return (
        <>
        <div className="sketch">
        <canvas
        ref = {canvasRef}
        width={800}
        height={800}
        style={{
            backgroundColor: 'white',
            cursor: eraserState ? 'url(/erasur.svg), auto' : 'url(/vite.svg), auto',
             // Set the width to 100% of the parent div
          }}
   
        />
        </div>
        
        </>
      )

    }

    export default Board;

















    
  
  

