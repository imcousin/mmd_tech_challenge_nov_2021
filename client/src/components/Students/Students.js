import React, { useEffect, useState } from 'react';
import Student from './Student/Student';
import jwt from "jsonwebtoken";
import { useNavigate } from 'react-router-dom';

const Students = () => {
  const navigate = useNavigate();
  // Declare a new state variable assignments
  // useState hook function returns a getter variable, setter function
  const [students, setStudents] = useState([])

  // Do after render
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('inst token', token);
    if (token) {
      const user = jwt.decode(token)
      console.log('user: ', user);
      if (!user) {
        console.log('no user')
        // user does not exists
        localStorage.removeItem('token')
        // return to login
        navigate('/')
      }
      else {
        console.log('have token');
        fetch('http://localhost:8080/students',{
          headers: {
            'x-access-token': localStorage.getItem('token'),
          }
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('setting students')
          setStudents(data);
        })
        .catch((error) => {
          console.log(error)
        })
      }
    } else {
      navigate('/')
    }
  }, [])

  return (
    <>
      <h1>Students</h1>
      {students.map((student, i) => {
        return(
          <Student key={i} student={student} index={i} />
        )
      })}
    </>
  )
};

export default Students;
