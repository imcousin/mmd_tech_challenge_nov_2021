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
    <div className="w-full max-w-xs mx-auto">
      <form onSubmit={loginUser} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="mb-5">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center justify-between">
          <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit" value="Login" />
        </div>
      </form>
    </div>
  )
};

export default Login;