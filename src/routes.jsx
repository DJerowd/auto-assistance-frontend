import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from './Pages/Home/Index';
import Signin from './Pages/Signin/Index';
import Signup from './Pages/Signup/Index';
import Dashboard from './Pages/Dashboard/Index';
import Garage from './Pages/Garage/Index';
import VehicleDetails from './Pages/Garage/VehicleDetails';
import Reminders from './Pages/Reminders/Index';
import Settings from './Pages/Settings/Index';

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('loggedInUser');
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/garage" element={<ProtectedRoute><Garage /></ProtectedRoute>} />
        <Route path="/garage/vehicle/:id" element={<ProtectedRoute><VehicleDetails /></ProtectedRoute>} />
        <Route path="/reminders" element={<ProtectedRoute><Reminders /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes