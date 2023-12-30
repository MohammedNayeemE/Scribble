import React from 'react'
import { useState } from 'react';

interface Chat {
    userid : string ,
    chat : string
}


function ChatBox() {

    const [chats, setChats] = useState<Chat[]>([
        {
          userid: 'user101yuwhn',
          chat: 'boiler',
        },
      ]);
    
      const [text, setText] = useState<string>('');
    
      const handleClick = () => {
        if (text) {
          // Update the state using the functional form of setChats
          setChats(prevChats => [
            ...prevChats,
            {
              userid: 'newUserId', // Replace with the actual user id
              chat: text,
            },
          ]);
    
          // Clear the input field after updating the state
          console.log(chats);
          setText('');

        }
    
        
      };
    

  return (
    <>
    <div className='chat-box'>
        <div className='chatting-area'>
            
           {
            chats.map((chat , index) => (
                <div key={index}>
                    <span style={{color:'green'}}>{`${chat.userid}:`}</span>
                    <span style={{color:'red'}}>{`${chat.chat}`}</span>
                    </div>
            ))
           }
        </div>
        <input type='text' value={text} onChange={(e) => setText(e.target.value)}/>

        <button className='btn' onClick={handleClick}>
            SEND
        </button>
    </div>
    </>
  )
}

export default ChatBox;