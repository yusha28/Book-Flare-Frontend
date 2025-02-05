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

  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // ✅ Corrected name handling
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast.error('❌ Passwords do not match!');
      return;
    }

    try {
      setIsSubmitting(true); // ✅ Show loading state

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullname, // ✅ Ensure correct backend key
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Registration failed!');
      }

      // ✅ Show success message
      toast.success('✅ Successfully Registered! Redirecting...');

      // ✅ Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (error) {
      console.error('❌ Registration Error:', error.message);
      toast.error(error.message || '❌ Registration failed!');
    } finally {
      setIsSubmitting(false); // ✅ Reset loading state
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-form">
          <h1>Sign Up</h1>
          <p>Create Your Account</p>
          <form onSubmit={handleSubmit}>
            {/* ✅ Fixed "name" attribute */}
            <input 
              type="text" 
              name="fullname" // ✅ Corrected from "fullname" to "name"
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
            {/* ✅ Button now shows loading state */}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/signin">Log In</a>
          </p>
        </div>
        
        {/* ✅ Display Image */}
        <div className="signup-image">
          <img src={BookImage} alt="Books" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
