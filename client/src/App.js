import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Assignments from './components/Assignments/Assignments';

function App() {
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
