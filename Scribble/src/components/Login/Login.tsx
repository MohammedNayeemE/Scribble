import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer , toast } from 'react-toastify';
import axios from 'axios';
const LoginSignupForm  = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [Name , setName] = useState<string>('');
  const [email , setemail] = useState<string>('');
  const [password , setPassword] = useState<string>('');
  const [image , setImage] = useState<string>('');
  const [loading , setLoading] = useState<boolean>(false);
  const notify = () =>  toast.error("Please Fill The Details 😒");
  const invalid = () => toast.error("Invalid Details ☠️");
  const lsucess = () => toast.success("Logged IN 😍");
  const ssucess = () => toast.success("You are now a family member 😘");
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };
  const handleLogin = async () =>{
    setLoading(true);
    if(email.trim() == '' || password.trim() == ''){
      setLoading(false);
        notify();
        return;
    }
    try{

        const response = await axios.post('http://localhost:8000/auth/login' || 'http://localhost:6969/auth/login' , {
            email : email ,
            password : password
        });
        if(response.status == 200){
         setTimeout(() =>{
          lsucess();
          setLoading(false);
         
          navigate('/canvas');
         }, 3000);
        }
        


    }
    catch(err){
      setLoading(false);
      invalid();
      return;
    }
  }

  const handleSignUp = async () =>{
    setLoading(true);
    if(Name.trim() == '' || email.trim() == '' || password.trim() == '' || image.trim() == ''){
      notify();
      setLoading(false);
      return;
    }
    try{
   const res = await axios.post('http://localhost:8000/auth/signup' , {
    username : Name ,
    email : email,
    password : password,
    image : image,

   })
   if(res.status == 200){
    
    setTimeout(() =>{
      setLoading(false);
      ssucess();
      
    } , 3000)
    
    return;
   }
   
    }
    catch(err){
      setTimeout(() =>{
      setLoading(false);
     invalid();
      }, 3000);

     return;
    }
  }
  
  return (
    <>
    <ToastContainer/>
    {loading ? (
      <div style={{display :'flex' , justifyContent : 'center' , alignItems:'center' , height:'100vh'}}>
      <div className="lds-ripple"><div></div><div></div></div>
      </div>
     
    ) : (<>
 
           <div style={{display:'flex' , justifyContent:'center' , alignItems:'center'  , height:'100vh' , 
        background: 'radial-gradient(rgb(192, 197, 206) 1px, white 1px)',
            backgroundSize: '15px 15px',

        }}>
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input className="toggle" type="checkbox" onChange={handleToggle} checked={isSignUp} />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className={`flip-card__inner ${isSignUp ? 'is-signup' : ''}`}>
            <div className="flip-card__front">
              <div className="title">LOG IN</div>
              <div className="flip-card__form">
                <input type="email" placeholder="Email" name="email" className="flip-card__input" value={email} onChange={(e) => setemail(e.target.value)} />
                <input type="password" placeholder="Password" name="password" className="flip-card__input" value={password} onChange={(e)=> setPassword(e.target.value)} />
                <button className="flip-card__btn" onClick={handleLogin}>Let's go!</button>
              </div>
            </div>
            <div className="flip-card__back">
              <div className="title">SIGN UP</div>
              <div className="flip-card__form">
                <input type="name" placeholder="Name" className="flip-card__input" value={Name} onChange={(e)=>setName(e.target.value)} />
                <input type="email" placeholder="Email" name="email" className="flip-card__input" value ={email} onChange={(e) => setemail(e.target.value)} />
                <input type="password" placeholder="Password" name="password" className="flip-card__input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                 <input type="name" placeholder="Image_url" name="image_url" className="flip-card__input" value={image} onChange={(e) => setImage(e.target.value)}/>

                <button className="flip-card__btn" onClick={handleSignUp}>CONFIRM!</button>
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
    </div>
    
    </>)}
    
    </>
  );
};

export default LoginSignupForm;
