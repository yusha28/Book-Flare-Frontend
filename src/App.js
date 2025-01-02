import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Navbar from './components/Navbar';
import AuthenticatedNavbar from './components/AuthenticatedNavbar';  // Import the authenticated Navbar
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from './context/AuthContext';  // Import Auth context
import 'react-toastify/dist/ReactToastify.css';

// Component to switch between navbars based on authentication state
function MainApp() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Conditional Navbar Rendering */}
      {isAuthenticated ? <AuthenticatedNavbar /> : <Navbar />}
      
      <ToastContainer />  {/* Toast container must be at the root level */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
    </div>
  );
}

// Wrap the entire app in AuthProvider
function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
