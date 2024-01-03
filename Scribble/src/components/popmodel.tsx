import React from 'react';
import { useState } from 'react';

import { Modal } from "react-bootstrap";

interface Req{
  ShowState : boolean,
  roomid : string
}
function PopModal({ShowState , roomid} : Req) {
  const [show , setshow] = useState<boolean>(ShowState);
  const handleClose = () =>{
    setshow(false);
  }
  return (
    <Modal
    show = {show}
    onHide={handleClose}
    >
      <Modal.Header closeButton>
         YOUR ROOM ID : {roomid}
      </Modal.Header>
      <Modal.Body>
        Copy and Share with your friends
      </Modal.Body>
    </Modal>
  )
}

export default PopModal;