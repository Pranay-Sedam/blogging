import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  async function handleLogin(e) {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);  // Display success message
        localStorage.setItem('token', data.token); // Store the token if needed
        navigate('/');         // Redirect to home page
      } else {
        alert(data.error);     // Display error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again.');
    }
  }

  return (
    <form className='login' onSubmit={handleLogin}>
      <h1>Log In</h1>
      <input
        type="text"
        placeholder='Username'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginPage;
