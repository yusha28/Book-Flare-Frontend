import React, { useState } from 'react';
import '../Signup/Signup.css';
import BookImage from '../../assets/images/Book Logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Simulate successful registration
    toast.success('Successfully Registered!');

    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigate('/signin');
    }, 2000);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-form">
          <h1>Sign Up</h1>
          <p>Create Your Account</p>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="fullname" 
              placeholder="Full name" 
              value={formData.fullname} 
              onChange={handleChange} 
              required 
            />
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
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm Password" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
            />
            <button type="submit">Sign up</button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/signin">Log In</a>
          </p>
        </div>
        
        <div className="signup-image">
          <img src={BookImage} alt="Books" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
