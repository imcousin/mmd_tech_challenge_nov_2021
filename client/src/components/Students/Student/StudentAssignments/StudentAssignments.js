import React from 'react';
import jwt from "jsonwebtoken";
import { Link } from 'react-router-dom';

class StudentAssignments extends React.Component {
  // console.log(assignment);
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      mark: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log(this.state.assignments);
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }


  handleChange = (e) => {
    let mark = e.target.value;

    if (isNaN(mark)) {
      mark = 0;
    }
    else if (mark < 0){
      mark = 0;
    }
    else if (mark > 100) {
      mark = 100;
    }
    this.setState({ mark: mark }, () =>{
      console.log('mark state: ', this.state.mark);
     })
  }


  handleSubmit = studentAssignment => e => {
    console.log('submit');
    console.log('studentAssignmentID ', studentAssignment);
    console.log('mark ', e.target.value);
    e.preventDefault();

    const token = localStorage.getItem('token');
    // const navigate = useNavigate();
    if (token) {
      const user = jwt.decode(token)
      console.log('user assment: ', user);
      if (!user) {
        console.log('no user')
        // user does not exists
        localStorage.removeItem('token')
        // return to login
        // navigate('/')
      } else {
        // Need to validate email; add student assignment
        fetch('http://localhost:8080/student_assignments_mark', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            instructorID: user.id, 
            studentID: studentAssignment.studentID, 
            assignmentID: studentAssignment.assignmentID, 
            mark: this.state.mark
          })
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error)
        })
      }
    } else {
      // navigate('/')
    }

  }


  render() {
    return (
      <>
        <p>
          <Link
            className="navbar-item"
            to="/instructor"
          >
            Back to Students
          </Link>
        </p>
        <h1>student assignments</h1>
          {this.state.assignments.map((assignment, i) => {
            return(
              Object.keys(assignment.answers).map((key,i) => {
                return (
                  <form key={i} onSubmit={this.handleSubmit(assignment)}>
                    <p className="ml-2">Assignment Question: id {assignment.assignmentID}</p>
                    <p className="ml-2">Answers:</p>
                    {(typeof assignment.answers[key] === 'string') &&
                      <p>{assignment.answers[key]}</p>
                    }
                    {Array.isArray(assignment.answers[key]) &&
                      <ul>
                        {assignment.answers[key].map((data,i)=> {
                          return (
                            <li key={i}>{data}</li>
                          )
                        })}
                      </ul>
                    }
                    <br />
                    <input 
                      type="number"
                      name="mark"
                      min="0"
                      max="100"
                      value={this.state.mark} 
                      onChange={this.handleChange} 
                    />
                    <input type="submit" />
                    <hr />
                  </form>
                );
              })
            )
          })}
      </>
    )
  }
};

export default StudentAssignments;
