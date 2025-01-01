import React, { useState } from 'react';
import back from './images/35231.jpg';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  

  const handleMailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();  
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password
      });
     if(response.data.message=="Welcome Back!")
     {
      toast.success(response.data.message); 
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", email);
      const checkResponse = await axios.post("http://localhost:5000/api/check_complete", { email });
      if (checkResponse.data.isComplete) {
        navigate('/dash');  
      } else {
        toast.info("Please complete your profile.");
        navigate('/complete'); 
      } 
     }
     else if(response.data.message=="Password Mismatched"){
      toast.error(response.data.message)
     }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Login failed, please try again.');
    }
  };

  return (
    <div className="login">
      <div className="login-grid">
        <div className='split'>
          <Link to="/">
            <FaArrowLeft />
          </Link>
          <img src={back} alt="background" />
        </div>
        <div className='login-input2'>
          <h1>Sign In</h1>
          <form onSubmit={handleLoginSubmit} className="login-input">
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleMailChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePassChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className='log-sign'>
              <button type="submit" className="login-btn">
                Login
              </button>
              or
              <Link to="/signup" className='login-sign-btn' style={{ backgroundImage: "linear-gradient(to right, red, orange)" }}>
                
                  Sign Up
                
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
