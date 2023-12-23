import React from 'react'
import '../App.css';
import { useState } from 'react';

function Home() {
    const [loading , setLoading] = useState(false);

    const loding = ()=>{
          setLoading(true);

          setTimeout(() =>{
            setLoading(false)
          } , 5000);
    }
  return (
    <>
    <div className='home-container'>
        <button onClick={loding} className='btn'>
            NEW
        </button>
        {loading ? (
        // Render a loading message or spinner while loading is true
        <p>Loading...</p>
      ) : (
        // Render the content when loading is false
        ''
        
      )}
       
    </div>
    </>
  )
}

export default Home;