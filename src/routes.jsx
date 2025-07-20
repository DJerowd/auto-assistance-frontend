import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Index';
import About from './Pages/About/Index';
import Signin from './Pages/Signin/Index';
import Signup from './Pages/Signup/Index';
import Dashboard from './Pages/Dashboard/Index';
import Garage from './Pages/Garage/Index';

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/garage" element={<Garage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes
