import React, { useEffect, useState } from 'react';
import Assignment from './Assignment/Assignment';
import jwt from "jsonwebtoken";
import { useNavigate } from 'react-router-dom';

const Assignments = () => {
  const history = useNavigate();
  const [quote, setAssignments] = useState('')

  async function populateAssignments() {
    console.log('inside getAssignments')
    const req = await fetch('http://localhost:8080/assignments', {

    })
    console.log('req: ',req)

    const data = await req.json();
    console.log('data ', data)
    if (data.status === 'ok') {
      setAssignments(data)
      console.log('have assignments', data)
    }
    else {
      console.log('no assignments')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      if (!user) {
        localStorage.removeItem('token')
        history.replaceState('/')
      }
      else {
        populateAssignments()
      }
    }
  }, [])
  
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
      <Assignment />
      <Assignment />
    </>
  )
};

export default Assignments;
