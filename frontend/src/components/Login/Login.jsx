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
        <div className="login-input">
          <form onSubmit={handleLoginSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={mail}
                onChange={handleMailChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={pass}
                onChange={handlePassChange}
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
