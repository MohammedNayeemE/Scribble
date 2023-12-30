import Board from "./Board";
import '../App.css';
import {useState} from 'react';

const CanvasDrawing = () =>{

    const [brushColor, setBrushColor] = useState<string>('black');
    const [brushSize, setBrushSize] = useState<number>(5);
    const [isErasing , setIsErasing] = useState<boolean>(false);
    const [croomopen , setcroomopen] = useState<boolean>(false);
    const toggleEraser = () => {
      setIsErasing(!isErasing);
    };
    const toggleChatRoom = () =>{
      setcroomopen(!croomopen);
    }
    return(
      <>
      
        <div className="App" >
        <h1>SCRIBBLE</h1>
        <div style={{width:'100%'}}>
        
        
        <div className='tools' >
            <div>
              <span>Color: </span>
              <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
            </div>
            <div>
              <span>Size: </span>
              <input type="range" color='#fac176'
                min="1" max="100" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} />
              <span>{brushSize}</span>
            </div>
            <div>
              <button className="btn" onClick={toggleEraser}>{isErasing ? 'DISABLE ERASER' : 'ENABLE ERASER'}</button>
            </div>
            <div style={{color:'white'}}>
              <button className="btn" onClick = {toggleChatRoom}>CHAT ROOM</button>
            </div>
          </div>
          <Board brushColor={brushColor} brushSize={brushSize} eraserState = {isErasing} chatroom = {croomopen}/>
        </div>
      </div>
      
      </>
    )
}
export default CanvasDrawing;