import { Modal  , Button} from 'react-bootstrap'
import { useState } from 'react';

interface Req {
    ShowState : boolean;
    JoinRoom : () => void;
    OnClick : (text:string) => void;

}
function Joinpopmodal({ShowState , JoinRoom , OnClick}:Req) {
    const [show ] = useState<boolean>(ShowState);
    const [text , setText] = useState<string>('');
    const handleClose = ()=>{
        JoinRoom()
    }
    const handleClick = () =>{
        if(text){
            OnClick(text);
        }
        JoinRoom();
    }
    return (
      <Modal
      show = {show}
      onHide={handleClose}
      >
        <Modal.Header closeButton>
           ENTER ROOM ID
        </Modal.Header>
        <Modal.Body>
          <div style={{marginBottom:'3px' , }}>
          <input type='text' value={text} onChange={(e)=>setText(e.target.value)}/>
          </div>
          <div>
          <Button onClick={handleClick}>JOIN</Button>
          </div>
        </Modal.Body>
      </Modal>
    )
}

export default Joinpopmodal
