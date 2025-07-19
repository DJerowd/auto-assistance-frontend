import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Index'
import About from './Pages/About/Index'

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes
