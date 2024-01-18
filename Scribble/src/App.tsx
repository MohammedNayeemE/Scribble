import CanvasDrawing from "./components/Canvas"
import Home from "./components/home"
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import NavBar from "./components/Navbar";

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/canvas" element={<CanvasDrawing/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

