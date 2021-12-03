import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Assignments from './components/Assignments/Assignments';

function App() {
  const token = localStorage.getItem('token');
  console.log('token? ', token);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/assignments" element={<Assignments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
