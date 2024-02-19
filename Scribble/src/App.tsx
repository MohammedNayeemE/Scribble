import CanvasDrawing from "./components/Canvas"
import Home from "./components/home"
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import LoginSignupForm from "./components/Login/Login"


export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/canvas" element={<CanvasDrawing/>}/>
      <Route path="/auth/login" element={<LoginSignupForm/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

