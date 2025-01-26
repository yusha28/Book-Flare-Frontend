import React, { useState } from 'react';
import './Login.css';
import BookImage from '../../assets/images/Book Logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to log in');
      }

      const { token, user } = await response.json();

      // Save the token and user details in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Logged in successfully!');
      navigate('/'); // Redirect to the homepage
    } catch (error) {
      console.error('Error during login:', error.message);
      toast.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData.email, formData.password);
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
            <button type="submit">Log In</button>
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
