import React, { useEffect, useState } from 'react';
import Assignment from './Assignment/Assignment';
import jwt from "jsonwebtoken";
import { useNavigate } from 'react-router-dom';

const Assignments = () => {
  const navigate = useNavigate();
  // Declare a new state variable assignments
  // useState hook function returns a getter variable, setter function
  const [assignments, setAssignments] = useState([])

  // Do after render
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('ass token', token);
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
        fetch('http://localhost:8080/assignments',{
          headers: {
            'x-access-token': localStorage.getItem('token'),
          }
        })
        .then((response) => response.json())
        .then((data) => {
          setAssignments(data);
        })
        .catch((error) => {
          console.log(error)
        })
      }
    } else {
      navigate('/')
    }
  }, [])

  // async function populateAssignments() {
  //   console.log('inside getAssignments')
  //   const req = await fetch('http://localhost:8080/assignments',{
  //     headers: {
  //       'x-access-token': localStorage.getItem('token'),
  //     }
  //   })

  //   const assignments_data = await req.json();
  //   if (!assignments_data.length) {
  //     console.log('no assignments')
  //   }
  //   else {
  //     console.log('have assignments', assignments_data)
  //     // [{_id: '61a8015bcb41cb0ab0f9b072', question: 'When was BCIT's 50th-aniversary celebration?', answers: {"answer1": "2016", "answer2": "1967","answer3": "2017", "answer4": "1987"}: '', date: '2021-12-03T18:45:44.256Z'}, {_id: '61a801c0cb41cb0ab0f9b073', question: 'Which of the following services does the LTC provide? Select all that apply.', answers: {"answer1": "Technical illustration", "answer2": "Instructional design","answer3": "Financial advice", "answer4": "Admission and Registration", "answer5": "Audio-visual loans"}: '', date: '2021-12-03T18:45:44.256Z'}, {_id: '61a801eccb41cb0ab0f9b074', question: 'The current Prime Minister in Canada is (include the starting year of the PM)', answers: {"answer1": ""}: '', date: '2021-12-03T18:45:44.256Z'}]
  //     for (let i = 0; i < assignments_data.length; i++) {
  //       setAssignments( assignments => [...assignments, assignments_data[i]] )
  //     }
  //     console.log('hihi1 ', assignments_data[0]); // {_id: '61a8015bcb41cb0ab0f9b072', question: 'When was BCIT's 50th-aniversary celebration?', answers: {"answer1": "2016", "answer2": "1967","answer3": "2017", "answer4": "1987"}: '', date: '2021-12-03T18:45:44.256Z'}
  //     console.log('hihi 2 ', assignments[0]); // undefined
  //   }
  // }

  // const classes = useStyles();

  // return (
  //   !assignments.length ? <CircularProgress /> : (
  //     <Grid className={classes.container} container alignItems="stretch" spacing={3}>
  //       {assignments.map((assignment) => (
  //         <Grid key={assignment._id} item xs={12} sm={6} md={6}>
  //           <Assignment assignment={assignment} setCurrentId={setCurrentId} />
  //         </Grid>
  //       ))}
  //     </Grid>
  //   )
  // );
  return (
    <>
      <h1>assignments component</h1>
      {assignments.map((assignment, i) => {
        return(
          <Assignment key={i} assignment={assignment} index={i} />
        )
      })}
    </>
  )
};

export default Assignments;
