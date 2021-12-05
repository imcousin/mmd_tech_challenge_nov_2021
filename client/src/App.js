import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Assignments from './components/Assignments/Assignments';
import Students from './components/Students/Students';
import StudentAssignment from './components/Students/Student/StudentAssignments/StudentAssignments';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/instructor" element={<Students />} />
          <Route path="/instructor/student_assignments/:id" element={<StudentAssignment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
