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
         <div>
            <img src='chefewa.jpg' alt='profile pic' 
            style= {{
              border:'none' , borderRadius:'50%' ,width:'50px' , cursor:'pointer'
            }}
            />
        </div>   
        </div>
        
        </div>
    </nav>
    
    </>
    )
}

export default NavBar;