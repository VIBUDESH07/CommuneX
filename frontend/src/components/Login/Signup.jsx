import React, { useState } from 'react';
import nel from './images/35231.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { Link } from 'react-router-dom';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!"); 
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        username,
        email,
        password,
      });
    
      toast.success(response.data.message); 
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('An error occurred while signing up.'); 
    }
  };

  return (
    <div className='sign-grid'>
      <div className='split-sign'>
        <img src={nel} alt="Signup Visual" />
      </div>
      <div className="sign-signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="sign-input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="sign-input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="sign-input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="sign-input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <Link to="/login" className='login-sign-btn' style={{ backgroundImage: "linear-gradient(to right, red, orange)" }}>
                
                Go to Login
              
            </Link>
      </div>
    
      
      <ToastContainer />
    </div>
  );
};

export default Signup;
