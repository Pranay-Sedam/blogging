import { useState } from "react"
import Post from "../Post";


const RegisterPage = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
 async function register(e) {
    e.preventDefault();
    fetch('http://localhost:4000/register', {
      method:'POST',
      body: JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'}

    })
  }

  return (
    <form className='register' onSubmit={register}>
    <h1>Register</h1>
    <input type="text" placeholder='UserName' 
    value={username} onChange={e => setUsername(e.target.value)} />
    <input type="password" placeholder='Password' 
    value={password} onChange={e => setPassword(e.target.value)} />
    <button>LogIn</button>
  </form>
  )
}

export default RegisterPage
