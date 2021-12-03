import React, { useEffect, useState } from 'react';
import Assignment from './Assignment/Assignment';
import jwt from "jsonwebtoken";
import { useNavigate } from 'react-router-dom';

const Assignments = () => {
  const navigate = useNavigate();
  // const [setAssignments] = useState('')

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
        populateAssignments()
      }
    } else {
      navigate('/')
    }
  }, [])

  async function populateAssignments() {
    console.log('inside getAssignments')
    const req = await fetch('http://localhost:8080/assignments',{
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })
    // console.log('req: ',req)

    const assignemnts_data = await req.json();
    if (!assignemnts_data.length) {
      console.log('no assignments')
    }
    else {
      console.log('have assignments', assignemnts_data)
      // setAssignments(assignemnts_data)
    }
  }
  
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
