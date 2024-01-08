import './components.css';
const NavBar = ()=>{
    return(
        <>
    <nav style={{margin:'2px' ,padding:'2px'   , borderRadius:'8px'}}>
        <div className='navbar'>
        <div style={{marginLeft:'5px' , cursor :'pointer' }}>
           <img src='pencil.png' width={50}/>
        </div>
        <div className='navlist'>
            <li>HOME</li>
            <li>ABOUT</li>
            <li>CONTACTUS</li>
            <li>STATUS</li>
            
        </div>
        <div className='profile' style={{marginRight:'5px' , border:'2px solid white'  , borderRadius : '3px' ,padding:'10px' , cursor:'pointer'}} >
                <button style={{background:'none' , padding:'2px' , border:'none'  }}>PROFILE</button>
            </div>
        </div>
    </nav>
    
    </>
    )
}

export default NavBar;