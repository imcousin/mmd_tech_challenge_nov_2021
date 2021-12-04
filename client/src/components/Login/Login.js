import React, { useState } from 'react';
import jwt from 'jsonwebtoken';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(e) {
    e.preventDefault();

    console.log('inside loginUser');

    // Need to validate email
    await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.user) {
        localStorage.setItem('token', data.user);
        console.log('Login successful');
  
        const user = jwt.decode(data.user);
        if (user.admin) {
          console.log('instructor');
          window.location.href = '/instructor'
        }
        else {
          console.log('students');
          window.location.href = '/assignments'
        }
      }
      else {
        alert('Wrong email and password.')
      }
    })
    .catch((error) => {
      console.log(error)
    })

  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </>
  )
};

export default Login;