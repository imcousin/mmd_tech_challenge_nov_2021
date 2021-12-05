import React from 'react';
// import jwt from "jsonwebtoken";
import { Link } from 'react-router-dom';

class StudentAssignments extends React.Component {
  // console.log(assignment);
  constructor(props) {
    super(props);
    this.state = {
      assignments: []
    }
  }
  
  componentDidMount() {
    let studentID = window.location.pathname.split('/').pop();

    // Need to validate email; add student assignment
    fetch('http://localhost:8080/student_assignments?' + new URLSearchParams({
      studentID: studentID}), {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({ assignments: data }, () => {
        // console.log(this.state.assignments);
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }


  render() {
    return (
      <>
        <p>
          <Link
            className="navbar-item"
            to="/instructor"
          >
            Students
          </Link>
        </p>
        <h1>student assignments</h1>
          {this.state.assignments.map((assignment, i) => {
            return(
              Object.keys(assignment.answers).map((key,i) => {
                return (
                  <div key={i}>
                    <p className="ml-2">{assignment.assignmentID}</p>
                    <p className="ml-2">{assignment.answers[key]}</p>
                    <input type="number" />
                    <input type="submit" />
                  </div>
                );
              })
            )
          })}
      </>
    )
  }
};

export default StudentAssignments;
