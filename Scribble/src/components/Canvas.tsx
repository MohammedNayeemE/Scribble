import Board from "./Board";
import '../App.css';
import {useState} from 'react';

const CanvasDrawing = () =>{

    const [brushColor, setBrushColor] = useState<string>('black');
    const [brushSize, setBrushSize] = useState<number>(5);
    const [isErasing , setIsErasing] = useState<boolean>(false);
    const [croomopen , setcroomopen] = useState<boolean>(false);
    const [sidebar , setsidebar] = useState<boolean>(false);
    //const [exit , setexit] = useState<boolean>(false);
    const toggleEraser = () => {
      setIsErasing(!isErasing);
    };
    const toggleChatRoom = () =>{
      setcroomopen(!croomopen);
    }
    const toggleSideBar = () =>{
      setsidebar(!sidebar);
    }
    
    return(
      <>
      <div className="App">
        <h1 style={{ fontFamily: 'Comic Sans MS', color: 'black' }}>SCRIBBLE</h1>
        <div style={{
          display:'flex',
          width:'100%'
        }}>
            
              <img src= {
                sidebar ? 'close.svg' : 'open.svg'
              }
               alt="close button" onClick={toggleSideBar}
               style={{cursor:'pointer'}} 
               />
            

        </div>
               <div style={{ display: 'flex', height: '100%' }}>
          {/* Sidebar */}
          
          <div
            style={{
               width: sidebar ? '25%' : '0',
              overflowX: 'hidden',
              transition: 'width 0.5s',
              display:'flex',
              flexShrink:'1',
              flexDirection:'column',
              padding:'10px',
              alignItems:'center',
             // position:'absolute'
            }}
          >
            <div className="tools" style={{ padding: '10px' }}>
              <div>
                <span style={{ fontFamily: 'Comic Sans MS' }}>COLOR: </span>
                <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
              </div>
              <div>
                <span style={{ fontFamily: 'Comic Sans MS' }}>SIZE: </span>
                <input
                  type="range"
                  color="#fac176"
                  min="1"
                  max="100"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                />
                <span>{brushSize}</span>
              </div>
              <div>
                <button className="btn" onClick={toggleEraser}>
                  {isErasing ? 'DISABLE ERASER' : 'ENABLE ERASER'}
                </button>
              </div>
              <div style={{ color: 'white' }}>
                <button className="btn" onClick={toggleChatRoom}>
                  CHAT ROOM
                </button>
              </div>
              <div>
                  <button  className="btn">EXIT</button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div style={{ flex: '1', overflowY: 'auto', padding: '5px' }}>
            <Board brushColor={brushColor} brushSize={brushSize} eraserState={isErasing} chatroom={croomopen}  />
          </div>
        </div>
      </div>
    </>
    )
}
export default CanvasDrawing;