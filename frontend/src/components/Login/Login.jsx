import React, { useEffect, useState } from 'react';
import back from './images/35231.jpg'
const Login = () => {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
   
    console.log('Component mounted or mail/pass changed', { mail, pass });
  }, [mail, pass]); 

  const handleMailChange = (e) => {
    setMail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
        console.log('Login attempt with:', { mail, pass });

   };

  return (
    <div className="login">
      <div className="login-grid">
        <div className='split'>
            <img src={back}></img>
        </div>
        <div className='login-input2'>
          <h1>Sign In</h1>
          <form onSubmit={handleLoginSubmit} className="login-input">
            <div className="input-group">
              <label>
                Email
              </label>
              <input
                type="text"
                id="email"
                value={mail}
                onChange={handleMailChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={pass}
                onChange={handlePassChange}
                placeholder="Enter your password"
              />
            </div>
            <div className='log-sign'>   
                       <button type="submit" className="login-btn">
              Login
            </button>
                      or
            <button type="submit" className='login-btn' style={{backgroundImage : "linear-gradient(to right,red,orange)"}}>
              Sign Up
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
