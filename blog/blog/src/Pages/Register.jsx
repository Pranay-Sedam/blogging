// Register.js
import React, { useState } from 'react';
import './Register.css'

const Register = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('password', password);
    alert('Registration successful!');
    // Redirect to home page after registration
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Register;
