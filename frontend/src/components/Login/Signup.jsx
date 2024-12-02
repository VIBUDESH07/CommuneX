import React, { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Info:', { username, email, password });
  };

  return (
    <div className="sign-signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="sign-input-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            placeholder={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="sign-input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="sign-input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
