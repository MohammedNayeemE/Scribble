import Board from "./Board";
import '../App.css';
import {useState} from 'react';

const CanvasDrawing = () =>{

    const [brushColor, setBrushColor] = useState('black');
    const [brushSize, setBrushSize] = useState<number>(5);
    const [isErasing , setIsErasing] = useState(false);

    const toggleEraser = () => {
      setIsErasing(!isErasing);
    };
    return(
      <>
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
          </div>
        <div className="App" >
        <h1>SCRIBBLE</h1>
        <div style={{width:'100%'}}>
        
          <Board brushColor={brushColor} brushSize={brushSize} eraserState = {isErasing}/>
          
        </div>
      </div>
      
      </>
    )
}
export default CanvasDrawing;