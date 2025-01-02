import React, { useState } from 'react';
import './Login.css';
import BookImage from '../../assets/images/Book Logo.png';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate authentication (Replace with real API call)
    if (formData.email && formData.password) {
      login();
      toast.success('Logged in successfully!');
      navigate('/');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <h1>Welcome back</h1>
          <p>Log in to continue</p>
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
            <button type="submit">Log IN</button>
          </form>
          <p className="signup-link">
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
        <div className="login-image">
          <img src={BookImage} alt="Books" />
        </div>
      </div>
    </div>
  );
}

export default Login;
