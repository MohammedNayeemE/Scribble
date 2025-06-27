import Home from "./components/home"
import Canvas from "./components/Canvas"
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import LoginSignupForm from "./components/Login/Login"


export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/canvas" element={<Canvas/>}/>
      <Route path="/auth/login" element={<LoginSignupForm/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

