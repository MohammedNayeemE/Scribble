import React from 'react'
import NavBar from './Navbar';
import '../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLoading = ()=>{
          setLoading(true);

          setTimeout(() =>{
            setLoading(false);
            navigate('/canvas');
          } , 5000);
         
    }
  return (
    <>
    <NavBar/>
    <div className='home-container'>
        
        {loading ? (
        // Render a loading message or spinner while loading is true
        <div className="lds-ripple"><div></div><div></div></div>
      ) : (
        // Render the content when loading is false
        <button onClick={handleLoading} className='btn'>
            NEW
        </button>
        
      )}
       
    </div>
    </>
  )
}

export default Home;